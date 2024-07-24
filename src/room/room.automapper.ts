import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { Room } from "./room.entity";

// dto
import { RoomHomeDto } from "./dto/room-home.dto";

@Injectable()
export class RoomAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Room,
        RoomHomeDto,
        forMember((dest) => dest.image, mapFrom((source) => source.roomHasImage[0]?.url)),
      );
    };
  }
}
