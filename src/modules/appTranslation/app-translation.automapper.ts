import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { AppTranslation } from "./app-translation.entity";

// dto
import { AppTranslationDto } from "./dto/app-translation.dto";

@Injectable()
export class AppTranslationAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        AppTranslation,
        AppTranslationDto,
        forMember(
          (dest) => dest.langTranslations,
          mapFrom((source) => source.langTranslations.map((langTranslation) => langTranslation)),
        ),
      );
    };
  }
}
