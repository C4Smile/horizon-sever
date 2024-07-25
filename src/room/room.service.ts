import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { ILike, Repository } from "typeorm";

// entity
import { Room } from "./room.entity";

// services
import { PageService } from "src/models/page-size";

// dto
import { RoomDto } from "./dto/room.dto";
import { AddRoomDto } from "./dto/add-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { RoomHomeDto } from "./dto/room-home.dto";
import { RoomGalleryDto } from "./dto/room-gallery.dto";
import { RoomDetailsDto } from "./dto/room-details.dto";

enum RoomType {
  Museable = 1,
}

enum RoomStatus {
  Active = 1,
}

@Injectable()
export class RoomService extends PageService {
  constructor(
    @InjectRepository(Room) private roomService: Repository<Room>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
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
    return [this.roomService.save(newRoom)];
  }

  async get({ sort, order, page, count }) {
    const list = await this.roomService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["status", "type", "roomHasImage", "roomHasImage360"],
      order: {
        [sort]: order,
      },
      where: {
        statusId: RoomStatus.Active,
        typeId: RoomType.Museable,
      },
    });

    return this.mapper.mapArrayAsync(list, Room, RoomDto);
  }

  async getHomeSlider() {
    const list = await this.roomService.find({
      take: 10,
      relations: ["roomHasImage"],
      order: {
        lastUpdate: "ASC",
      },
      where: {
        statusId: RoomStatus.Active,
        typeId: RoomType.Museable,
      },
    });

    return this.mapper.mapArrayAsync(list, Room, RoomHomeDto);
  }

  async getForGallery({ count }) {
    const list = await this.roomService.find({
      take: count,
      relations: ["roomHasImage"],
      order: {
        lastUpdate: "ASC",
      },
    });

    return this.mapper.mapArrayAsync(list, Room, RoomGalleryDto);
  }

  async getById(id: number) {
    const roomFound = await this.roomService.findOne({
      where: {
        id,
      },
      relations: ["status", "type", "roomHasImage", "roomHasImage360"],
    });

    if (!roomFound) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    return this.mapper.mapArrayAsync([roomFound], Room, RoomDto);
  }

  async getDetailsBySlug(slug: string) {
    const roomFound = await this.roomService.findOne({
      where: {
        urlName: slug,
      },
      relations: ["status", "type"],
    });

    if (!roomFound) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    return this.mapper.mapArrayAsync([roomFound], Room, RoomDetailsDto);
  }

  async remove(id: number) {
    const result = await this.roomService.update({ id }, { deleted: true });
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

    /* if (params.description) {
      where.description = ILike(`%${params.description}%`);
    }

    if (params.number) {
      where.number = params.number;
    }

    if (params.status) {
      where.status = params.status;
    } */

    return where;
  }
}
