import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class RoomHasImage
 * @description Represents the relationship between a room and an image
 */
@Entity({ name: "room-has-image" })
export class RoomHasImage {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  roomId: number;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  imageId: number;
}
