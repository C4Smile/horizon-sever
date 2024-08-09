import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { RoomType } from "./room-type.entity";

// dto
import { AddRoomTypeDto } from "./dto/add-room-type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room-type.dto";

@Injectable()
export class RoomTypeService extends CrudService<RoomType, AddRoomTypeDto, UpdateRoomTypeDto> {
  constructor(
    @InjectRepository(RoomType) roomTypeService: Repository<RoomType>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(roomTypeService, mapper);
  }
}
