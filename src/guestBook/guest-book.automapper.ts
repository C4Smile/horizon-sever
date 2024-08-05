import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";

// entity
import { GuestBook } from "./guest-book.entity";

// dto
import { GuestBookDto } from "./dto/guest-book.dto";
import { ClientGuestBookDto } from "./dto/client-guest-book.dto";

@Injectable()
export class GuestBookAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      /* GUEST BOOK DTO */
      createMap(
        mapper,
        GuestBook,
        GuestBookDto,
        forMember(
          (dest) => dest.guestBookHasImage,
          mapFrom((source) =>
            source.guestBookHasImage?.map((image) => ({
              imageId: { id: image.id, url: image.url, fileName: image.fileName },
            })),
          ),
        ),
      );
      /* CLIENT GUEST BOOK DTO */
      createMap(
        mapper,
        GuestBook,
        ClientGuestBookDto,
        forMember(
          (dest) => dest.images,
          mapFrom((source) => source.guestBookHasImage?.map((image) => image.url)),
        ),
        forMember(
          (dest) => dest.date,
          mapFrom((source) =>
            source.date.toLocaleDateString("es-Es", { year: "numeric", month: "long", day: "numeric" }),
          ),
        ),
      );
    };
  }
}
