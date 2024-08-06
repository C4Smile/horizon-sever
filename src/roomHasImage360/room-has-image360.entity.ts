import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class RoomHasImage360
 * @description Represents the relationship between a room and an image360
 */
@Entity({ name: "room-has-image360" })
export class RoomHasImage360 {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  roomId: number;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  image360Id: number;
}
