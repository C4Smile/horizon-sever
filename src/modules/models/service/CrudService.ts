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

@Injectable()
export class CrudService<Entity, AddDto, UpdateDto> {
  protected imageService: ImageService;
  protected entityService: Repository<Entity>;
  protected relationships: string[];

  constructor(
    entityService: Repository<Entity>,
    imageRepository?: Repository<Photo>,
    relationships: string[] = [],
  ) {
    this.entityService = entityService;
    this.relationships = relationships;
    if (imageRepository) this.imageService = new ImageService(imageRepository);
  }

  async create(entity: AddDto) {
    const image = (entity as any).image;
    if (image) {
      const resultImage = await this.imageService.create(image as AddBlobDto);
      delete (entity as any).image;
      (entity as any).imageId = resultImage.id;
    }

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
