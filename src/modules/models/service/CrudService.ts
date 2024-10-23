import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindOptionsOrder, Repository } from "typeorm";

// dto
import { PagedResult, QueryFilter } from "../types";

@Injectable()
export class CrudService<Entity, AddDto, UpdateDto> {
  protected entityService: Repository<Entity>;
  protected relationships: string[];

  constructor(
    entityService: Repository<Entity>,
    relationships?: string[],
  ) {
    this.entityService = entityService;
    this.relationships = relationships;
  }

  async create(entity: AddDto) {
    const newEntity = this.entityService.create(entity as any);
    const saved = await this.entityService.save(newEntity);
    return [saved] as unknown as Promise<Entity[]>;
  }

  async get(query?: QueryFilter): Promise<PagedResult<Entity>> {
    const { page, count, sort, order } = query;

    const list = await this.entityService.find({
      skip: page * count,
      take: count,
      order: {
        [sort as keyof Entity]: order,
      } as FindOptionsOrder<Entity>,
      relations: this.relationships,
    });

    const total = await this.entityService.count();

    return { items: list, total: total };
  }

  async getById(id: number) {
    const entityFound = await this.entityService.findOne({
      where: {
        id,
      } as any,
      relations: this.relationships,
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
