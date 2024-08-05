import { AutoMap } from "@automapper/classes";

// dto
import { ModelDto } from "src/models/model.dto";
import { GuestBookHasImageDto } from "./guest-book-has-image.dto";

export class GuestBookDto extends ModelDto {
  @AutoMap()
  name: string;

  @AutoMap()
  urlName: string;

  date: Date;

  guestBookHasImage: GuestBookHasImageDto[];
}
