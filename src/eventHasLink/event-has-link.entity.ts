import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class EventHasLink
 * @description Represents the relationship between events and external link
 */
@Entity({ name: "eventHasLink" })
export class EventHasLink {
  @PrimaryColumn()
  eventId: number = 0;

  @PrimaryColumn()
  linkId: number = 0;
}
