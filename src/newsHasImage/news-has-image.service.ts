import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { NewsHasImage } from "./news-has-image.entity";

// dto
import { AddNewsHasImageDto } from "./dto/add-news-has-image.dto";

@Injectable()
export class NewsHasImageService {
  constructor(@InjectRepository(News) private newsHasImageService: Repository<NewsHasImage>) {}

  async create(news: AddNewsHasImageDto) {
    const newNews = this.newsHasImageService.create(news);
    return this.newsHasImageService.save(newNews);
  }

  async remove(imageId: number) {
    const result = await this.newsHasImageService.delete({ imageId });
    if (result.affected === 0)
      throw new HttpException("News has image not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
