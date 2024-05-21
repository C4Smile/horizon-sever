import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Tag } from "./tag.entity";

// dto
import { AddTagDto } from "./dto/add-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private countryService: Repository<Tag>) {}

  async create(country: AddTagDto) {
    const countryFound = await this.countryService.findOne({
      where: { name: country.name },
    });

    if (countryFound) throw new HttpException("Tag already exists", HttpStatus.CONFLICT);

    const newTag = this.countryService.create(country);
    return this.countryService.save(newTag);
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

    if (!countryFound) throw new HttpException("Tag not Found", HttpStatus.NOT_FOUND);

    return countryFound;
  }

  async remove(id: number) {
    const result = await this.countryService.delete({ id });
    if (result.affected === 0) throw new HttpException("Tag not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateTagDto) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) throw new HttpException("Tag not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.countryService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("Tag already exists", HttpStatus.CONFLICT);

    const updatedTag = Object.assign(countryFound, data);

    return this.countryService.save(updatedTag);
  }
}
