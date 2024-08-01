import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// entity
import { Tag } from "./tag.entity";

// dto
import { AddTagDto } from "./dto/add-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { ClientTagDto } from "./dto/client-tag.dto";

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagService: Repository<Tag>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(tag: AddTagDto) {
    const tagFound = await this.tagService.findOne({
      where: { name: tag.name },
    });

    if (tagFound) throw new HttpException("Tag already exists", HttpStatus.CONFLICT);

    const newTag = this.tagService.create(tag);
    const saved = await this.tagService.save(newTag);
    return [saved];
  }

  async get({ sort, order, page, count }) {
    const list = await this.tagService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
    });

    return list;
  }

  async headers() {
    const list = await this.tagService.find({
      order: {
        lastUpdate: "DESC",
      },
    });

    return this.mapper.mapArrayAsync(list, Tag, ClientTagDto);
  }

  async getById(id: number) {
    const tagFound = await this.tagService.findOne({
      where: {
        id,
      },
    });

    if (!tagFound) throw new HttpException("Tag not Found", HttpStatus.NOT_FOUND);

    return [tagFound];
  }

  async remove(id: number) {
    const result = await this.tagService.update({ id }, { deleted: true });
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
    const saved = await this.tagService.save(updatedTag);
    return [saved];
  }
}
