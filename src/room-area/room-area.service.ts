import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// entity
import { RoomArea } from "./room-area.entity";

// dto
import { RoomAreaDto } from "./dto/room-area.dto";
import { AddRoomAreaDto } from "./dto/add-room-area.dto";
import { UpdateRoomAreaDto } from "./dto/update-room-area.dto";
import { ClientRoomAreaDto } from "./dto/client-room-area.dto";

enum RoomAreaStatus {
  Active = 1,
}

@Injectable()
export class RoomAreaService {
  constructor(
    @InjectRepository(RoomArea) private roomAreaService: Repository<RoomArea>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(roomArea: AddRoomAreaDto) {
    const roomAreaFound = await this.roomAreaService.findOne({
      where: [{ name: roomArea.name }, { roomId: roomArea.roomId }],
    });

    if (roomAreaFound) throw new HttpException("RoomArea already exists", HttpStatus.CONFLICT);

    const newRoomArea = this.roomAreaService.create(roomArea);
    return [this.roomAreaService.save(newRoomArea)];
  }

  async get({ sort, order, page, count }) {
    const list = await this.roomAreaService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
    });

    return this.mapper.mapArrayAsync(list, RoomArea, RoomAreaDto);
  }

  async getByRoomId({ sort, order, page, count, roomId }) {
    const list = await this.roomAreaService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
      where: {
        roomId,
        statusId: RoomAreaStatus.Active,
      },
    });

    return this.mapper.mapArrayAsync(list, RoomArea, ClientRoomAreaDto);
  }

  async getById(id: number) {
    const roomAreaFound = await this.roomAreaService.findOne({
      where: {
        id,
      },
      relations: ["room", "status"],
    });

    if (!roomAreaFound) throw new HttpException("RoomArea not Found", HttpStatus.NOT_FOUND);

    return [roomAreaFound];
  }

  async remove(id: number) {
    const result = await this.roomAreaService.update({ id }, { deleted: true });
    if (result.affected === 0) throw new HttpException("RoomArea not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateRoomAreaDto) {
    const roomAreaFound = await this.roomAreaService.findOne({
      where: {
        id,
      },
    });

    if (!roomAreaFound) throw new HttpException("RoomArea not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.roomAreaService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("RoomArea already exists", HttpStatus.CONFLICT);

    const updatedRoomArea = Object.assign(roomAreaFound, data);

    return this.roomAreaService.save(updatedRoomArea);
  }
}
