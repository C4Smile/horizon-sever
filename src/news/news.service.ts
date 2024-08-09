import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { News } from "./news.entity";

// dto
import { AddNewsDto } from "./dto/add-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { LastNewsDto } from "./dto/last-news.dto";

// utils
import { filterByTags } from "src/tags/utils";

@Injectable()
export class NewsService extends CrudService<News, AddNewsDto, UpdateNewsDto> {
  constructor(@InjectRepository(News) newsService: Repository<News>, @InjectMapper() mapper: Mapper) {
    const relationships = ["newsHasTag", "newsHasImage"];
    super(newsService, mapper, relationships);
  }

  async lasts() {
    const list = await this.entityService.find({
      take: 6,
      relations: this.relationships,
      order: {
        lastUpdate: "ASC",
      },
    });

    return this.mapper.mapArrayAsync(list, News, LastNewsDto);
  }

  async list({ sort = "lastUpdate", order = "DESC", page = 0, count = 9, tags = "" }) {
    const list = await this.entityService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: this.relationships,
      order: {
        [sort]: order,
      },
    });

    return this.mapper.mapArrayAsync(filterByTags(list, tags), News, LastNewsDto);
  }

  async getSmallNews(count: number) {
    const list = await this.entityService.find({
      take: count,
      relations: this.relationships,
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
