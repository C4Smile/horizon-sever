import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { MoreThan, Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { Room } from "./room.entity";

// utils
import { QueryFilter, PagedResult } from "src/models/types";

// dto
import { RoomDto } from "./dto/room.dto";
import { AddRoomDto } from "./dto/add-room.dto";
import { NextRoomDto } from "./dto/next-room.dto";
import { RoomHomeDto } from "./dto/room-home.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { RoomGalleryDto } from "./dto/room-gallery.dto";
import { RoomDetailsDto } from "./dto/room-details.dto";

enum RoomType {
  Museable = 1,
}

enum RoomStatus {
  Active = 1,
}

@Injectable()
export class RoomService extends CrudService<Room, AddRoomDto, UpdateRoomDto> {
  constructor(@InjectRepository(Room) roomService: Repository<Room>, @InjectMapper() mapper: Mapper) {
    const relationships = ["status", "type", "roomHasImage", "roomHasImage360"];
    super(roomService, mapper, relationships);
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<RoomDto>> => {
    const result = await this.get(query);
    const mappedItems = await this.mapper.mapArrayAsync(result.items, Room, RoomDto);
    return {
      items: mappedItems,
      total: result.total,
    };
  };

  async getHomeSlider(type: number = 0) {
    const list = await this.entityService.find({
      take: 10,
      relations: ["roomHasImage"],
      order: {
        lastUpdate: "ASC",
      },
      where: {
        statusId: RoomStatus.Active,
        typeId: type,
      },
    });

    return this.mapper.mapArrayAsync(list, Room, RoomHomeDto);
  }

  async getForGallery({ count }, type?: number) {
    const list = await this.entityService.find({
      take: count,
      relations: ["roomHasImage"],
      order: {
        lastUpdate: "ASC",
      },
      where: {
        typeId: type,
      },
    });

    return this.mapper.mapArrayAsync(list, Room, RoomGalleryDto);
  }

  async getDetailsBySlug(slug: string) {
    const roomFound = await this.entityService.findOne({
      where: {
        urlName: slug,
      },
      relations: ["status", "type", "roomHasImage", "roomHasImage360"],
    });

    if (!roomFound) throw new HttpException("Room not Found", HttpStatus.NOT_FOUND);

    // fetching next room

    let nextRoom = await this.entityService.findOne({
      where: {
        number: MoreThan(roomFound.number),
      },
      relations: ["status", "type", "roomHasImage", "roomHasImage360"],
    });

    if (!nextRoom) {
      nextRoom = await this.entityService.findOne({
        where: {
          statusId: RoomStatus.Active,
          typeId: RoomType.Museable,
        },
        relations: ["status", "type", "roomHasImage", "roomHasImage360"],
      });
    }

    const asDetailRoom = await this.mapper.mapAsync(roomFound, Room, RoomDetailsDto);

    if (nextRoom) asDetailRoom.nextRoom = await this.mapper.mapAsync(nextRoom, Room, NextRoomDto);

    return asDetailRoom;
  }
}
