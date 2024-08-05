import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class Room
 * @description Represents a room
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
