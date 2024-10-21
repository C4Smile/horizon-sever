import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { HorizonUser } from "./horizon-user.entity";

// dto
import { HorizonUserDto } from "./dto/horizon-user.dto";

@Injectable()
export class HorizonUserAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        HorizonUser,
        HorizonUserDto,
        forMember(
          (dest) => dest.imageId,
          mapFrom((source) => ({
            id: source.image.id,
            url: source.image.url,
            fileName: source.image.fileName,
          })),
        ),
        forMember(
          (dest) => dest.roleId,
          mapFrom((source) => source.role),
        ),
      );
    };
  }
}
