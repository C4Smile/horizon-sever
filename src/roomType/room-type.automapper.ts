import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { RoomType } from "./room-type.entity";

// dto
import { RoomTypeDto } from "./dto/room-type.dto";

@Injectable()
export class RoomTypeAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, RoomType, RoomTypeDto);
    };
  }
}
