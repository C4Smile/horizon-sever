import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { NewsHasTag } from "./news-has-tag.entity";

// dto
import { AddNewsHasTagDto } from "./dto/add-news-has-tag.dto";

@Injectable()
export class NewsHasTagService {
  constructor(@InjectRepository(NewsHasTag) private newsHasTagService: Repository<NewsHasTag>) {}

  async create(newsHasTag: AddNewsHasTagDto) {
    const newNewsHasTag = this.newsHasTagService.create(newsHasTag);
    const saved = await this.newsHasTagService.save(newNewsHasTag);
    return [saved];
  }

  async remove(newsHasTag: AddNewsHasTagDto) {
    const result = await this.newsHasTagService.delete({
      newsId: newsHasTag.newsId,
      tagId: newsHasTag.tagId,
    });
    if (result.affected === 0) throw new HttpException("News not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
