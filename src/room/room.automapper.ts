import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { Room } from "./room.entity";

// dto
import { RoomDto } from "./dto/room.dto";
import { RoomHomeDto } from "./dto/room-home.dto";
import { RoomGalleryDto } from "./dto/room-gallery.dto";
import { BlobDto } from "src/image/dto/blob.dto";
import { RoomDetailsDto } from "./dto/room-details.dto";
import { NextRoomDto } from "./dto/next-room.dto";

@Injectable()
export class RoomAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      /* ROOM DTO */
      createMap(
        mapper,
        Room,
        RoomDto,
        forMember(
          (dest) => dest.roomHasImage,
          mapFrom((source) =>
            source.roomHasImage?.map((image) => ({
              imageId: { id: image.id, url: image.url, fileName: image.fileName } as BlobDto,
            })),
          ),
        ),
        forMember(
          (dest) => dest.roomHasImage360,
          mapFrom((source) =>
            source.roomHasImage360?.map((image) => ({
              imageId: { id: image.id, url: image.url, fileName: image.fileName } as BlobDto,
            })),
          ),
        ),
      );
      /* ROOM HOME DTO */
      createMap(
        mapper,
        Room,
        RoomHomeDto,
        forMember(
          (dest) => dest.image,
          mapFrom((source) => source.roomHasImage[0]?.url ?? null),
        ),
      );
      /* ROOM GALLERY DTO */
      createMap(
        mapper,
        Room,
        RoomGalleryDto,
        forMember(
          (dest) => dest.image,
          mapFrom((source) => source.roomHasImage[0]?.url ?? null),
        ),
      );
      /* ROOM DETAILS DTO */
      createMap(
        mapper,
        Room,
        RoomDetailsDto,
        forMember(
          (dest) => dest.images,
          mapFrom((source) => source.roomHasImage?.map((image) => image.url) ?? []),
        ),
        forMember(
          (dest) => dest.images360,
          mapFrom((source) => source.roomHasImage360?.map((image) => image.url) ?? []),
        ),
      );
      /* NEXT ROOM DTO */
      createMap(
        mapper,
        Room,
        NextRoomDto,
        forMember(
          (dest) => dest.image,
          mapFrom((source) => source.roomHasImage[0]?.url ?? null),
        ),
      );
    };
  }
}
