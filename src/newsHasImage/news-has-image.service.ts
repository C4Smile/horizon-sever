import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Photo } from "src/image/image.entity";
import { NewsHasImage } from "./news-has-image.entity";

// dto
import { AddNewsHasImageDto } from "./dto/add-news-has-image.dto";

@Injectable()
export class NewsHasImageService {
  constructor(
    @InjectRepository(NewsHasImage) private newsService: Repository<NewsHasImage>,
    @InjectRepository(Photo) private imageService: Repository<Photo>,
  ) {}

  async create(news: AddNewsHasImageDto) {
    const newNews = this.newsService.create(news);
    const saved = await this.newsService.save(newNews);

    await this.imageService.update(news.imageId, { alt: news.alt });

    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.newsService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("News Has Image not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
