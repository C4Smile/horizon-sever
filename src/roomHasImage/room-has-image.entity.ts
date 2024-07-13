import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class RoomHasImage
 * @description Represents the relationship between rooms and images
 */
@Entity({ name: "roomHasImage" })
export class RoomHasImage {
  @PrimaryColumn()
  roomId: number = 0;

  @PrimaryColumn()
  imageId: number = 0;
}
