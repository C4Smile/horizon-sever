import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class Room
 * @description Represents a room
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
