import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// entity
import { News } from "./news.entity";

// dto
import { AddNewsDto } from "./dto/add-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { LastNewsDto } from "./dto/last-news.dto";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsService: Repository<News>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(news: AddNewsDto) {
    const newsFound = await this.newsService.findOne({
      where: { title: news.title },
    });

    if (newsFound) throw new HttpException("News already exists", HttpStatus.CONFLICT);

    const newNews = this.newsService.create(news);

    return [this.newsService.save(newNews)];
  }

  async get({ sort, order, page, count }) {
    const list = await this.newsService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["newsHasTag", "newsHasImage"],
      order: {
        [sort]: order,
      },
    });
    return list;
  }

  async lasts() {
    const list = await this.newsService.find({
      take: 6,
      relations: ["newsHasTag", "newsHasImage"],
      order: {
        lastUpdate: "ASC",
      },
    });

    return this.mapper.mapArrayAsync(list, News, LastNewsDto);
  }

  async list({ sort = "lastUpdate", order = "DESC", page = 0, count = 9, tags = "" }) {
    const list = await this.newsService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["newsHasTag", "newsHasImage"],
      order: {
        [sort]: order,
      },
    });

    // filtering and paring tags

    if (tags.length) {
      const parsedTags = tags.split("|").map((tag) => tag.toLowerCase());
      const filterByTags = list.filter((news) =>
        news.newsHasTag?.some((tag) => parsedTags.indexOf(tag.name.toLowerCase()) >= 0),
      );

      return this.mapper.mapArrayAsync(filterByTags, News, LastNewsDto);
    }
    return this.mapper.mapArrayAsync(list, News, LastNewsDto);
  }

  async getById(id: number) {
    const newsFound = await this.newsService.findOne({
      where: {
        id,
      },
      relations: ["newsHasTag", "newsHasImage"],
    });

    if (!newsFound) throw new HttpException("News not Found", HttpStatus.NOT_FOUND);

    return [newsFound];
  }

  async remove(id: number) {
    const result = await this.newsService.update({ id }, { deleted: true });
    if (result.affected === 0) throw new HttpException("News not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateNewsDto) {
    const newsFound = await this.newsService.findOne({
      where: {
        id,
      },
    });

    if (!newsFound) throw new HttpException("News not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.newsService.findOne({
      where: {
        title: data.title,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("News already exists", HttpStatus.CONFLICT);

    const updatedNews = Object.assign(newsFound, data);

    return this.newsService.save(updatedNews);
  }

  async getSmallNews(count: number) {
    const list = await this.newsService.find({
      take: count,
      relations: ["newsHasTag", "newsHasImage"],
      order: {
        lastUpdate: "ASC",
      },
    });

    const parsed = list.map((item) => {
      const { title, description, newsHasImage, newsHasTag } = item;
      return { title, description, newsHasImage, newsHasTag };
    });
    return { data: parsed };
  }
}
