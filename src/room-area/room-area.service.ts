import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { Repository } from "typeorm";

// entity
import { RoomArea } from "./room-area.entity";

// dto
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
    const roomAreasFound = await this.roomAreaService.find({
      order: {
        number: "DESC",
      },
    });

    const found = roomAreasFound.find(
      (area) => area.name === roomArea.name && area.roomId === roomArea.roomId,
    );

    if (found) throw new HttpException("RoomArea already exists", HttpStatus.CONFLICT);

    roomArea.number = roomAreasFound[0]?.number + 1 ?? 1;

    const newRoomArea = this.roomAreaService.create(roomArea);
    const saved = await this.roomAreaService.save(newRoomArea);
    return [saved];
  }

  async get({ sort, order, page, count }) {
    const list = await this.roomAreaService.find({
      skip: page * count,
      take: (page + 1) * count,
      relations: ["room", "status", "roomAreaHasImage", "roomAreaHasImage360"],
      order: {
        [sort]: order,
      },
    });

    const mapped = [];
    // TODO MAP THIS CORRECTLY
    for (const roomArea of list) {
      const newArea = { ...roomArea, roomAreaHasImage: [], roomAreaHasImage360: [] };
      newArea.roomAreaHasImage = roomArea.roomAreaHasImage.map((image) => ({ imageId: { ...image } }));
      newArea.roomAreaHasImage360 = roomArea.roomAreaHasImage360.map((image) => ({
        imageId: { ...image },
      }));
      mapped.push(newArea);
    }

    return mapped;
  }

  async getByRoomId({ sort, order, page, count, roomId }) {
    const list = await this.roomAreaService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [sort]: order,
      },
      relations: ["room", "status", "roomAreaHasImage", "roomAreaHasImage360"],
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
      relations: ["room", "status", "roomAreaHasImage", "roomAreaHasImage360"],
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
    const saved = await this.roomAreaService.save(updatedRoomArea);

    return [saved];
  }
}
