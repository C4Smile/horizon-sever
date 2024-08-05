import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class RoomArea
 * @description Represents a room
 */
@Entity({ name: "room-area-has-image" })
export class RoomAreaHasImage {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  roomAreaId: number;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  imageId: number;
}
