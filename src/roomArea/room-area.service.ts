import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { RoomArea } from "./room-area.entity";

// dto
import { AddRoomAreaDto } from "./dto/add-room-area.dto";
import { UpdateRoomAreaDto } from "./dto/update-room-area.dto";
import { ClientRoomAreaDto } from "./dto/client-room-area.dto";
import { UpdateRoomAreaOrderDto } from "./dto/update-room-area-order.dto";

enum RoomAreaStatus {
  Active = 1,
}

@Injectable()
export class RoomAreaService extends CrudService<RoomArea, AddRoomAreaDto, UpdateRoomAreaDto> {
  constructor(
    @InjectRepository(RoomArea) roomAreaService: Repository<RoomArea>,
    @InjectMapper() mapper: Mapper,
    relationships: string[] = ["room", "status", "roomAreaHasImage", "roomAreaHasImage360"],
  ) {
    super(roomAreaService, mapper, relationships);
  }

  async get({ sort, order, page, count }) {
    const list = await this.entityService.find({
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
    const list = await this.entityService.find({
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

  async saveOrder(data: UpdateRoomAreaOrderDto[]) {
    for (let i = 0; i < data.length; i += 1) {
      const toSave = { id: data[i].id, number: i + 1 };
      await this.entityService.save(toSave);
    }

    return [data];
  }
}
