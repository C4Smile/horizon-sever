import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class EventHasTag
 * @description Represents the relationship of event with tag
 */
@Entity({ name: "event-has-tag" })
export class EventHasTag {
  @PrimaryColumn()
  eventId: number = 0;

  @PrimaryColumn()
  tagId: number = 0;
}
