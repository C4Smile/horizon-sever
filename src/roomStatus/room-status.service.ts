import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { RoomStatus } from "./room-status.entity";

// dto
import { AddRoomStatusDto } from "./dto/add-room-status.dto";
import { UpdateRoomStatusDto } from "./dto/update-room-status.dto";

@Injectable()
export class RoomStatusService extends CrudService<RoomStatus, AddRoomStatusDto, UpdateRoomStatusDto> {
  constructor(
    @InjectRepository(RoomStatus) roomStatusService: Repository<RoomStatus>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(roomStatusService, mapper);
  }
}
