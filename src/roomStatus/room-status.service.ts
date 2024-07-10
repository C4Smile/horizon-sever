import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { RoomStatus } from "./room-status.entity";

// dto
import { AddRoomStatusDto } from "./dto/add-room-status.dto";
import { UpdateRoomStatusDto } from "./dto/update-room-status.dto";

@Injectable()
export class RoomStatusService {
  constructor(@InjectRepository(RoomStatus) private roomStatusService: Repository<RoomStatus>) {}

  async create(roomStatus: AddRoomStatusDto) {
    const roomStatusFound = await this.roomStatusService.findOne({
      where: { name: roomStatus.name },
    });

    if (roomStatusFound) throw new HttpException("RoomStatus already exists", HttpStatus.CONFLICT);

    const newRoomStatus = this.roomStatusService.create(roomStatus);
    return this.roomStatusService.save(newRoomStatus);
  }

  async get({ order, page, count }) {
    const list = await this.roomStatusService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [order]: "ASC",
      },
    });

    return list;
  }

  async getById(id: number) {
    const roomStatusFound = await this.roomStatusService.findOne({
      where: {
        id,
      },
    });

    if (!roomStatusFound) throw new HttpException("RoomStatus not Found", HttpStatus.NOT_FOUND);

    return roomStatusFound;
  }

  async remove(id: number) {
    const result = await this.roomStatusService.delete({ id });
    if (result.affected === 0) throw new HttpException("RoomStatus not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateRoomStatusDto) {
    const roomStatusFound = await this.roomStatusService.findOne({
      where: {
        id,
      },
    });

    if (!roomStatusFound) throw new HttpException("RoomStatus not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.roomStatusService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("RoomStatus already exists", HttpStatus.CONFLICT);

    const updatedRoomStatus = Object.assign(roomStatusFound, data);

    return this.roomStatusService.save(updatedRoomStatus);
  }
}
