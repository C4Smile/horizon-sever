import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { RoomArea } from "./room-area.entity";

// dto
import { RoomAreaDto } from "./dto/room-area.dto";
import { BlobDto } from "src/image/dto/blob.dto";
import { ClientRoomAreaDto } from "./dto/client-room-area.dto";

@Injectable()
export class RoomAreaAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      /* ROOM AREA DTO */
      createMap(
        mapper,
        RoomArea,
        RoomAreaDto,
        forMember(
          (dest) => dest.roomAreaHasImage,
          mapFrom((source) =>
            source.roomAreaHasImage?.map((image) => ({
              imageId: { id: image.id, url: image.url, fileName: image.fileName } as BlobDto,
            })),
          ),
        ),
        forMember(
          (dest) => dest.roomAreaHasImage360,
          mapFrom((source) =>
            source.roomAreaHasImage360?.map((image) => ({
              imageId: { id: image.id, url: image.url, fileName: image.fileName } as BlobDto,
            })),
          ),
        ),
      );
      /* CLIENT ROOM AREA DTO */
      createMap(
        mapper,
        RoomArea,
        ClientRoomAreaDto,
        forMember(
          (dest) => dest.image,
          mapFrom((source) => source.roomAreaHasImage[0]?.url ?? null),
        ),
      );
    };
  }
}
