import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class GuestBook
 * @description Represents a room
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
