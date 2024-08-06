import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class GuestBookHasImage
 * @description Represents the relationship between a guest book and an image
 */
@Entity({ name: "guest-book-has-image" })
export class GuestBookHasImage {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  guestBookId: number;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  imageId: number;
}
