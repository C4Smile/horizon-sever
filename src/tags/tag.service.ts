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
  constructor(@InjectRepository(Tag) private tagService: Repository<Tag>) {}

  async create(tag: AddTagDto) {
    const tagFound = await this.tagService.findOne({
      where: { name: tag.name },
    });

    if (tagFound) throw new HttpException("Tag already exists", HttpStatus.CONFLICT);

    const newTag = this.tagService.create(tag);
    return this.tagService.save(newTag);
  }

  async get({ order, page, count }) {
    const queryBuilder = this.tagService.createQueryBuilder("tags");
    queryBuilder
      .orderBy(order)
      .where({ deleted: false })
      .skip(page * count)
      .take((page + 1) * count);
    const list = await queryBuilder.getRawAndEntities();
    return list.entities;
  }

  async getById(id: number) {
    const tagFound = await this.tagService.findOne({
      where: {
        id,
      },
    });

    if (!tagFound) throw new HttpException("Tag not Found", HttpStatus.NOT_FOUND);

    return tagFound;
  }

  async remove(id: number) {
    const result = await this.tagService.delete({ id });
    if (result.affected === 0) throw new HttpException("Tag not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateTagDto) {
    const tagFound = await this.tagService.findOne({
      where: {
        id,
      },
    });

    if (!tagFound) throw new HttpException("Tag not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.tagService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("Tag already exists", HttpStatus.CONFLICT);

    const updatedTag = Object.assign(tagFound, data);

    return this.tagService.save(updatedTag);
  }
}