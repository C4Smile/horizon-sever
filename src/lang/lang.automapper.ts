import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { Lang } from "./lang.entity";

// dto
import { LangDto } from "./dto/lang.dto";

@Injectable()
export class LangAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Lang, LangDto);
    };
  }
}
