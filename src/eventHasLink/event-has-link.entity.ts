import { Event } from "src/event/event.entity";
import { ExternalLink } from "src/externalLink/external-link.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

/**
 * @class EventHasLink
 * @description Represents the relationship between events and external link
 */
@Entity({ name: "event-has-link" })
export class EventHasLink {
  @PrimaryColumn({ type: "int" })
  eventId: number;

  @ManyToOne(() => Event)
  event: Event;

  @PrimaryColumn({ type: "int" })
  linkId: number = 0;

  @ManyToOne(() => ExternalLink)
  link: ExternalLink;

  @Column({ type: "text" })
  url: string = "";

  get Event() {
    return this.event;
  }
}
