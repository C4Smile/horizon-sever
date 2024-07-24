import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { News } from "./news.entity";

// dto
import { LastNewsDto } from "./dto/last-news-dto.dto";

@Injectable()
export class NewsAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        News,
        LastNewsDto,
        forMember(
          (dest) => dest.image,
          mapFrom((source) => source.newsHasImage[0]?.url),
        ),
        forMember(
          (dest) => dest.tag,
          mapFrom((source) => source.newsHasTag[0]?.name),
        ),
      );
    };
  }
}
