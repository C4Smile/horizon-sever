import { Column, Entity, ManyToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Event } from "src/event/event.entity";

/**
 * @class Tag
 * @description Represents a country
 */
@Entity({ name: "externalLink" })
export class ExternalLink extends Model {
  @Column({ unique: true })
  name: string = "";

  @Column({ unique: true })
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
