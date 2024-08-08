import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// entity
import { Model } from "../model";

// dto
import { AddModelDto } from "../dto/add-model.dto";
import { UpdateModelDto } from "../dto/update-model.dto";

@Injectable()
export class CrudService<
  Entity extends Model,
  AddDto extends AddModelDto,
  UpdateDto extends UpdateModelDto,
> {
  protected entityService: Repository<Entity>;
  protected mapper: Mapper;

  constructor(entityService: Repository<Entity>, @InjectMapper() mapper: Mapper) {
    this.entityService = entityService;
    this.mapper = mapper;
  }

  async create(entity: AddDto) {
    const newEntity = this.entityService.create(entity as any);
    const saved = await this.entityService.save(newEntity);
    return [saved];
  }

  async get({ sort, order, page, count }) {
    const list = await this.entityService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
    });

    return list;
  }

  async getById(id: number) {
    const entityFound = await this.entityService.findOne({
      where: {
        id,
      } as any,
    });

    if (!entityFound) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);

    return [entityFound];
  }

  async remove(ids: number[]) {
    const result = await this.entityService.update(ids, { deleted: true } as any);
    if (result.affected === 0) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);
    return { count: result.affected };
  }

  async restore(ids: number[]) {
    const result = await this.entityService.update(ids, { deleted: false } as any);
    if (result.affected === 0) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);
    return { count: result.affected };
  }

  async update(id: number, data: UpdateDto) {
    const entityFound = await this.entityService.findOne({
      where: {
        id,
      } as any,
    });

    if (!entityFound) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);

    const updatedEntity = Object.assign(entityFound, data);
    const saved = await this.entityService.save(updatedEntity);
    return [saved];
  }
}
