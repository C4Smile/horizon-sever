import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class EventHasImage
 * @description Represents the relationship between events and images
 */
@Entity({ name: "eventHasImage" })
export class EventHasImage {
  @PrimaryColumn()
  eventId: number = 0;

  @PrimaryColumn()
  imageId: number = 0;
}
