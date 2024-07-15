import { Column, Entity, ManyToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Event } from "src/event/event.entity";

/**
 * @class Tag
 * @description Represents an external link
 */
@Entity({ name: "externalLink" })
export class ExternalLink extends Model {
  @Column({ type: "text", unique: true })
  name: string = "";

  @Column({ type: "text", unique: true })
  preview: string = "";

  @ManyToMany(() => Event, (event) => event.eventHasLink)
  events: Event[];

  /**
   * @returns Events
   */
  get Events() {
    return this.events;
  }
}
