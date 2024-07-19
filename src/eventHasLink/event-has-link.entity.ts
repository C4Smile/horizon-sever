import { Event } from "src/event/event.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

/**
 * @class EventHasLink
 * @description Represents the relationship between events and external link
 */
@Entity({ name: "event-has-link" })
export class EventHasLink {
  @PrimaryColumn()
  eventId: number = 0;

  @ManyToOne(() => Event, (event) => event.eventHasLink)
  event: Event;

  @PrimaryColumn()
  linkId: number = 0;

  @Column({ type: "text" })
  url: string = "";

  get Event() {
    return this.event;
  }
}
