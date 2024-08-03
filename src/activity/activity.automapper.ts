import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";

// entity
import { Activity } from "./activity.entity";

// dto
import { ActivityDto } from "./dto/activity.dto";
import { BlobDto } from "src/image/dto/blob.dto";

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
          mapFrom(({ image }) =>
            !image ? null : ({ id: image.id, url: image.url, fileName: image.fileName } as BlobDto),
          ),
        ),
      );
    };
  }
}
