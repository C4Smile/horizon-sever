import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { NewsHasTag } from "./news-has-tag.entity";

// dto
import { AddNewsHasTagDto } from "./dto/add-news-has-tag.dto";

@Injectable()
export class NewsHasTagService {
  constructor(@InjectRepository(News) private newsHasTagService: Repository<NewsHasTag>) {}

  async create(news: AddNewsHasTagDto) {
    const newNews = this.newsHasTagService.create(news);
    return this.newsHasTagService.save(newNews);
  }

  async remove(tagId: number) {
    const result = await this.newsHasTagService.delete({ tagId });
    if (result.affected === 0) throw new HttpException("News has tag not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
