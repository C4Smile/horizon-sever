import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class RoomAreaHasImage
 * @description Represents the relationship between a room area and an image
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
