import { Column, Entity, ManyToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Event } from "src/event/event.entity";

/**
 * @class EventTag
 * @description Represents a country
 */
@Entity({ name: "countries" })
export class EventTag extends Model {
  @Column({ unique: true })
  name: string = "";

  @ManyToMany(() => Event, (event) => event.EventTags)
  events: Event[];

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns Events
   */
  get Events() {
    return this.events;
  }
}
