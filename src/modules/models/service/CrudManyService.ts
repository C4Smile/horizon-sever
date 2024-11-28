import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

// dto
import { UpdateRelationshipDto } from "../dto/update-model.dto";
import { AddRelationshipDto } from "../dto/add-model.dto";
import { RelationshipDto } from "../dto/model.dto";

@Injectable()
export class CrudManyService<
  Entity,
  AddDto extends AddRelationshipDto,
  UpdateDto extends UpdateRelationshipDto,
> {
  protected entityService: Repository<Entity>;
  protected relationships: string[];
  protected attributeId: string;
  protected remoteId: string;

  constructor(
    entityService: Repository<Entity>,
    attributeId: string,
    remoteId: string,
    relationships?: string[],
  ) {
    this.entityService = entityService;
    this.attributeId = attributeId;
    this.remoteId = remoteId;
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

  async create(entityId: number, add: AddDto) {
    const newAdd = this.entityService.create({
      ...add,
      [this.attributeId as keyof Entity]: entityId,
    } as DeepPartial<Entity>);
    return await this.entityService.save(newAdd);
  }

  async remove(entityId: number, ids: number[]) {
    for (const itemId of ids) {
      const condition = {};
      condition[this.attributeId] = entityId;
      condition[this.remoteId] = itemId;
      await this.entityService.delete(condition);
    }

    return { count: ids.length };
  }

  async removeSingle(entityId: number, remoteId: number) {
    const condition = {};
    condition[this.attributeId] = entityId;
    condition[this.remoteId] = remoteId;
    return await this.entityService.delete(condition);
  }

  async update(id: number, data: UpdateDto) {
    const entityFound = await this.entityService.findOne({
      where: {
        id: data.id,
      } as any,
    });

    if (!entityFound) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);

    const updatedEntity = Object.assign(entityFound, data);
    const saved = await this.entityService.save(updatedEntity);
    return [saved];
  }
}
