import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";

// entity
import { Activity } from "./activity.entity";

// dto
import { ActivityDto } from "./dto/activity.dto";

@Injectable()
export class ActivityAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      /* SERVICE DTO */
      createMap(
        mapper,
        Activity,
        ActivityDto,
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
