import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/dto/model.dto";
import { GuestBookHasImageDto } from "src/guestBookHasImage/dto/guest-book-has-image.dto";

export class GuestBookDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  @AutoMap()
  date: Date;

  @AutoMap()
  content: string = "";

  guestBookHasImage: GuestBookHasImageDto[];
}
