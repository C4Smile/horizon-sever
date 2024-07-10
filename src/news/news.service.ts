import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { News } from "./news.entity";

// dto
import { AddNewsDto } from "./dto/add-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
// import { Tag } from "src/tags/tag.entity";

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News) private newsService: Repository<News>) {}

  async create(news: AddNewsDto) {
    const newsFound = await this.newsService.findOne({
      where: { title: news.title },
    });

    if (newsFound) throw new HttpException("News already exists", HttpStatus.CONFLICT);

    const newNews = this.newsService.create(news);

    // newNews.tags = news.tagsId.map((id) => ({ ...new Tag(id), id }));

    return this.newsService.save(newNews);
  }

  async get({ order, page, count }) {
    const list = await this.newsService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["province", "tags", "photo"],
      order: {
        [order]: "ASC",
      },
    });

    return list;
  }

  async getById(id: number) {
    const newsFound = await this.newsService.findOne({
      where: {
        id,
      },
    });

    if (!newsFound) throw new HttpException("News not Found", HttpStatus.NOT_FOUND);

    return newsFound;
  }

  async remove(id: number) {
    const result = await this.newsService.delete({ id });
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
