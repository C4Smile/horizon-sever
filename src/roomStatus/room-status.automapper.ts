import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { RoomStatus } from "./room-status.entity";

// dto
import { RoomStatusDto } from "./dto/room-status.dto";

@Injectable()
export class RoomStatusAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, RoomStatus, RoomStatusDto);
    };
  }
}
