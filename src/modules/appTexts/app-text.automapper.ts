import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { AppText } from "./app-text.entity";

// dto
import { AppTextDto } from "./dto/app-text.dto";

@Injectable()
export class AppTextAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, AppText, AppTextDto);
    };
  }
}
