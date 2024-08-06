import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { News } from "./news.entity";

// dto
import { LastNewsDto } from "./dto/last-news.dto";
import { BlobDto } from "src/image/dto/blob.dto";
import { NewsDto } from "./dto/news.dto";
import { TagDto } from "src/tags/dto/tag.dto";

@Injectable()
export class NewsAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      /* NEWS DTO */
      createMap(
        mapper,
        News,
        NewsDto,
        forMember(
          (dest) => dest.newsHasImage,
          mapFrom((source) =>
            source.newsHasImage?.map((image) => ({
              imageId: { id: image.id, url: image.url, fileName: image.fileName } as BlobDto,
            })),
          ),
        ),
        forMember(
          (dest) => dest.newsHasTag,
          mapFrom((source) => source.newsHasTag.map((tag) => ({ tagId: tag as TagDto }))),
        ),
      );
      /* LAST NEWS DTO */
      createMap(
        mapper,
        News,
        LastNewsDto,
        forMember(
          (dest) => dest.image,
          mapFrom((source) => source.newsHasImage[0]?.url ?? null),
        ),
        forMember(
          (dest) => dest.tag,
          mapFrom((source) => source.newsHasTag[0]?.name ?? null),
        ),
      );
    };
  }
}
