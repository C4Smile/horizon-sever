import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { MuseumUser } from "./museum-user.entity";

// dto
import { MuseumUserDto } from "./dto/museum-user.dto";

@Injectable()
export class MuseumUserAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        MuseumUser,
        MuseumUserDto,
        forMember(
          (dest) => dest.imageId,
          mapFrom((source) => ({
            id: source.image.id,
            url: source.image.url,
            fileName: source.image.fileName,
          })),
        ),
      );
    };
  }
}
