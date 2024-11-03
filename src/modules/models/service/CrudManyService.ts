import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class CrudManyService<Entity, AddDto, UpdateDto> {
  protected entityService: Repository<Entity>;
  protected relationships: string[];
  protected attributeId: string;

  constructor(entityService: Repository<Entity>, attributeId: string, relationships?: string[]) {
    this.entityService = entityService;
    this.attributeId = attributeId;
    this.relationships = relationships;
  }

  async getByEntityId(entityId: number) {
    const list = this.entityService.find({
      where: {
        [this.attributeId as keyof Entity]: entityId,
      } as FindOptionsWhere<Entity>,
      relations: this.relationships,
    });

    return list;
  }

  async create(entityId: number, adds: AddDto[]) {
    const aSaved = [];
    for (const add of adds) {
      const newAdd = this.entityService.create({
        ...add,
        [this.attributeId as keyof Entity]: entityId,
      } as DeepPartial<Entity>);
      const saved = await this.entityService.save(newAdd);
      aSaved.push(saved);
    }

    return aSaved;
  }

  async remove(ids: number[]) {
    const result = await this.entityService.update(ids, { deleted: true } as any);
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
