import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";

// entity
import { Service } from "./service.entity";

// dto
import { ServiceDto } from "./dto/service.dto";

@Injectable()
export class ServiceAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      /* SERVICE DTO */
      createMap(
        mapper,
        Service,
        ServiceDto,
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
