import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindOptionsOrder, Repository } from "typeorm";

// types
import { PagedResult, QueryFilter } from "../types";

// dto
import { AddBlobDto } from "src/modules/image/dto/add-blob.dto";
import { LockDto } from "src/modules/user/dto/lock.dto";

// services
import { ImageService } from "src/modules/image/image.service";

// entity
import { Photo } from "src/modules/image/image.entity";

// utils
import { parseRelationships } from "../functions/parseRelationships";

@Injectable()
export class CrudService<Entity, AddDto, UpdateDto> {
  protected imageService: ImageService;
  protected entityService: Repository<Entity>;
  protected relationships: string[];
  protected photoFields: string[];

  constructor(
    entityService: Repository<Entity>,
    imageRepository?: Repository<Photo>,
    relationships: string[] = [],
    photoFields: string[] = ["image"],
  ) {
    this.entityService = entityService;
    this.relationships = relationships;
    this.photoFields = photoFields;
    if (imageRepository) this.imageService = new ImageService(imageRepository);
  }

  /**
   * Turns the blobs the client sends into image rows, one per photo field. The
   * field name doubles as the column, so `icon` writes `iconId`, and a field
   * the caller left out is not touched.
   * @param data - add or update payload, mutated in place
   * @returns the fields that got a new image
   */
  private async storeBlobs(data: any): Promise<string[]> {
    const stored: string[] = [];
    for (const field of this.photoFields) {
      const blob = data[field];
      if (!blob) continue;
      const saved = await this.imageService.create(blob as AddBlobDto);
      delete data[field];
      data[`${field}Id`] = saved.id;
      stored.push(field);
    }
    return stored;
  }

  async create(entity: AddDto) {
    await this.storeBlobs(entity);

    const newEntity = this.entityService.create(parseRelationships(entity));

    const saved = await this.entityService.save(newEntity);

    return [saved] as unknown as Promise<Entity[]>;
  }

  async get(query?: QueryFilter): Promise<PagedResult<Entity>> {
    const { page, pageSize, sort, order } = query;

    const list = await this.entityService.find({
      skip: page * pageSize,
      take: pageSize,
      order: {
        [sort as keyof Entity]: order,
      } as FindOptionsOrder<Entity>,
      relations: this.relationships,
    });

    const totalElements = await this.entityService.count();

    return {
      items: list,
      totalElements,
      totalPages: pageSize > 0 ? Math.ceil(totalElements / pageSize) : 0,
    };
  }

  async getById(id: number) {
    const entityFound = await this.entityService.findOne({
      where: {
        id,
      } as any,
      relations: this.relationships,
    });

    if (!entityFound) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);
    return entityFound;
  }

  async remove(ids: number[]) {
    const result = await this.entityService.update(ids, { deletedAt: new Date() } as any);
    if (result.affected === 0) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);
    return { count: result.affected };
  }

  async restore(ids: number[]) {
    const result = await this.entityService.update(ids, { deletedAt: null } as any);
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

    // the ids to drop once their replacement is in place
    const oldIds = new Map<string, number>(
      this.photoFields.map((field) => [field, (entityFound as any)[`${field}Id`]]),
    );

    const replaced = await this.storeBlobs(data);

    const updatedEntity = Object.assign(entityFound, parseRelationships(data));
    const saved = await this.entityService.save(updatedEntity);

    // only when a new image took its place, the default one (1) is shared and never dropped
    for (const field of replaced) {
      const oldId = oldIds.get(field);
      if (oldId > 1) await this.imageService.remove(oldId);
    }

    return [saved];
  }

  async lock(id: number, user: LockDto) {
    const entityFound = await this.entityService.findOne({
      where: {
        id,
      } as any,
    });

    if (!entityFound) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);
    const updatedEntity = Object.assign(entityFound, { ...entityFound, lockedBy: user.userId });
    const saved = await this.entityService.save(updatedEntity);
    return [saved];
  }

  async release(id: number) {
    const entityFound = await this.entityService.findOne({
      where: {
        id,
      } as any,
    });

    if (!entityFound) throw new HttpException("Entity not Found", HttpStatus.NOT_FOUND);

    const updatedEntity = Object.assign(entityFound, { ...entityFound, lockedBy: 0 });
    const saved = await this.entityService.save(updatedEntity);
    return [saved];
  }
}
