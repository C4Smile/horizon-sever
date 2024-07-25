import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

import { toSlug } from "some-javascript-utils";

// entity
import { Tag } from "./tag.entity";

// dto
import { TagDto } from "./dto/tag.dto";
import { ClientTagDto } from "./dto/client-tag.dto";

@Injectable()
export class TagAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Tag, TagDto);
      createMap(
        mapper,
        Tag,
        ClientTagDto,
        forMember(
          (dest) => dest.label,
          mapFrom((source) => source.name),
        ),
        forMember(
          (dest) => dest.slug,
          mapFrom((source) => toSlug(source.name)),
        ),
      );
    };
  }
}
