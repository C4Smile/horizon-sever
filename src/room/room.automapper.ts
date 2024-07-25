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

@Injectable()
export class RoomAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
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
            source.roomHasImage?.map((image) => ({
              imageId: { id: image.id, url: image.url, fileName: image.fileName } as BlobDto,
            })),
          ),
        ),
      );
      createMap(mapper, Room, RoomDetailsDto);
      createMap(
        mapper,
        Room,
        RoomHomeDto,
        forMember(
          (dest) => dest.image,
          mapFrom((source) => source.roomHasImage[0]?.url),
        ),
      );
      createMap(
        mapper,
        Room,
        RoomGalleryDto,
        forMember(
          (dest) => dest.image,
          mapFrom((source) => source.roomHasImage[0]?.url),
        ),
      );
    };
  }
}
