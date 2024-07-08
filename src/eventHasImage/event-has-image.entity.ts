import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class EventHasImage
 * @description Represents the relationship between events and images
 */
@Entity({ name: "events" })
export class EventHasImage {
  @PrimaryColumn()
  eventId: number = 0;

  @PrimaryColumn("increment")
  imageId: number = 0;
}
