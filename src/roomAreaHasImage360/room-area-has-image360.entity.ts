import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class RoomAreaHasImage360
 * @description Represents the relationship between a room and an image360
 */
@Entity({ name: "room-area-has-image360" })
export class RoomAreaHasImage360 {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  roomAreaId: number;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  image360Id: number;
}
