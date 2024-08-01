import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// entity
import { RoomType } from "./room-type.entity";

// dto
import { AddRoomTypeDto } from "./dto/add-room-type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room-type.dto";

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType) private roomTypeService: Repository<RoomType>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(roomType: AddRoomTypeDto) {
    const roomTypeFound = await this.roomTypeService.findOne({
      where: { name: roomType.name },
    });

    if (roomTypeFound) throw new HttpException("RoomType already exists", HttpStatus.CONFLICT);

    const newRoomType = this.roomTypeService.create(roomType);
    const saved = await this.roomTypeService.save(newRoomType);
    return [saved];
  }

  async get({ sort, order, page, count }) {
    const list = await this.roomTypeService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
    });

    return list;
  }

  async getById(id: number) {
    const roomTypeFound = await this.roomTypeService.findOne({
      where: {
        id,
      },
    });

    if (!roomTypeFound) throw new HttpException("RoomType not Found", HttpStatus.NOT_FOUND);

    return [roomTypeFound];
  }

  async remove(id: number) {
    const result = await this.roomTypeService.update({ id }, { deleted: true });
    if (result.affected === 0) throw new HttpException("RoomType not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateRoomTypeDto) {
    const roomTypeFound = await this.roomTypeService.findOne({
      where: {
        id,
      },
    });

    if (!roomTypeFound) throw new HttpException("RoomType not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.roomTypeService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("RoomType already exists", HttpStatus.CONFLICT);

    const updatedRoomType = Object.assign(roomTypeFound, data);
    const saved = await this.roomTypeService.save(updatedRoomType);
    return [saved];
  }
}
