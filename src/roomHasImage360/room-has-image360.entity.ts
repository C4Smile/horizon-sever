import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class RoomHasImage360
 * @description Represents the relationship between rooms and images
 */
@Entity({ name: "roomHasImage360" })
export class RoomHasImage360 {
  @PrimaryColumn()
  roomId: number = 0;

  @PrimaryColumn()
  imageId: number = 0;
}
