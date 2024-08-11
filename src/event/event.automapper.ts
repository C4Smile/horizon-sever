import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { Event } from "./event.entity";

// dto
import { BlobDto } from "src/image/dto/blob.dto";
import { TagDto } from "src/tags/dto/tag.dto";
import { EventDto } from "./dto/event.dto";

@Injectable()
export class EventAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      /* NEWS DTO */
      createMap(
        mapper,
        Event,
        EventDto,
        forMember(
          (dest) => dest.eventHasImage,
          mapFrom(
            (source) =>
              source.eventHasImage?.map((image) => ({
                imageId: { id: image.id, url: image.url, fileName: image.fileName } as BlobDto,
              })) ?? [],
          ),
        ),
        forMember(
          (dest) => dest.eventHasTag,
          mapFrom((source) => source.eventHasTag?.map((tag) => ({ tagId: tag as TagDto })) ?? []),
        ),
        forMember(
          (dest) => dest.eventHasLink,
          mapFrom(
            (source) =>
              source.eventHasLink?.map((link) => ({ linkId: { id: link.linkId }, url: link.url })) ??
              [],
          ),
        ),
        forMember(
          (dest) => dest.eventHasSchedule,
          mapFrom(
            (source) =>
              source.eventHasSchedule?.map((schedule) => ({
                id: schedule.id,
                date: schedule.date,
                description: schedule.description,
              })) ?? [],
          ),
        ),
      );
    };
  }
}
