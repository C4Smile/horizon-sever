import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { RoomArea } from "./room-area.entity";

// dto
import { RoomAreaDto } from "./dto/room-area.dto";

@Injectable()
export class RoomAreaAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, RoomArea, RoomAreaDto);
    };
  }
}
