import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { NewsTag } from "./news-tag.entity";

// dto
import { AddNewsTagDto } from "./dto/add-news-tag.dto";
import { UpdateNewsTagDto } from "./dto/update-news-tag.dto";

@Injectable()
export class NewsTagService {
  constructor(@InjectRepository(NewsTag) private countryService: Repository<NewsTag>) {}

  async create(country: AddNewsTagDto) {
    const countryFound = await this.countryService.findOne({
      where: { name: country.name },
    });

    if (countryFound) throw new HttpException("NewsTag already exists", HttpStatus.CONFLICT);

    const newNewsTag = this.countryService.create(country);
    return this.countryService.save(newNewsTag);
  }

  get() {
    return this.countryService.find();
  }

  async getById(id: number) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) throw new HttpException("NewsTag not Found", HttpStatus.NOT_FOUND);

    return countryFound;
  }

  async remove(id: number) {
    const result = await this.countryService.delete({ id });
    if (result.affected === 0) throw new HttpException("NewsTag not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateNewsTagDto) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) throw new HttpException("NewsTag not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.countryService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("NewsTag already exists", HttpStatus.CONFLICT);

    const updatedNewsTag = Object.assign(countryFound, data);

    return this.countryService.save(updatedNewsTag);
  }
}
