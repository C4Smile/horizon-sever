import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { ExternalLink } from "./external-link.entity";

// dto
import { ExternalLinkDto } from "./dto/external-link.dto";

@Injectable()
export class ExternalLinkAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ExternalLink, ExternalLinkDto);
    };
  }
}
