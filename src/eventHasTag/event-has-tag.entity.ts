import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class EventHasTag
 * @description Represents the relationship between events and images
 */
@Entity({ name: "eventHasTag" })
export class EventHasTag {
  @PrimaryColumn()
  eventId: number = 0;

  @PrimaryColumn()
  tagId: number = 0;
}
