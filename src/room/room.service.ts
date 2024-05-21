import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ILike, Repository } from "typeorm";

// entity
import { Room } from "./room.entity";

// services
import { PageService } from "src/models/page-size";

// dto
import { RoomDto } from "./dto/room.dto";
import { AddRoomDto } from "./dto/add-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Injectable()
export class RoomService extends PageService {
  constructor(@InjectRepository(Room) private roomService: Repository<Room>) {
    super();
  }

  async create(room: AddRoomDto) {
    const roomFound = await this.roomService.findOne({
      where: { name: room.name },
    });

    if (roomFound) throw new HttpException("Room already exists", HttpStatus.CONFLICT);

    if (room.number && room.number.length) {
      const roomFound = await this.roomService.findOne({
        where: { number: room.number },
      });

      if (roomFound) throw new HttpException("Number already in use", HttpStatus.CONFLICT);
    }

    const newRoom = this.roomService.create(room);
    return this.roomService.save(newRoom);
  }

  async get({ order, page, count }) {
    const queryBuilder = this.roomService.createQueryBuilder("rooms");
    queryBuilder
      .orderBy(order)
      .where({ deleted: false })
      .skip(page * count)
      .take((page + 1) * count);
    const list = await queryBuilder.getRawAndEntities();
    return list.entities;
  }

  async getById(id: number) {
    const roomFound = await this.roomService.findOne({
      where: {
        id,
      },
    });

    if (!roomFound) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    return roomFound;
  }

  async remove(id: number) {
    const result = await this.roomService.delete({ id });
    if (result.affected === 0) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, data: UpdateRoomDto) {
    const roomFound = await this.roomService.findOne({
      where: {
        id,
      },
    });

    if (!roomFound) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    const updatedRoom = Object.assign(roomFound, data);

    return this.roomService.save(updatedRoom);
  }

  private createWhereQuery(params: RoomDto) {
    const where: any = {};

    if (params.name) {
      where.name = ILike(`%${params.name}%`);
    }

    if (params.description) {
      where.description = ILike(`%${params.description}%`);
    }

    if (params.number) {
      where.number = params.number;
    }

    if (params.status) {
      where.status = params.status;
    }

    return where;
  }
}
