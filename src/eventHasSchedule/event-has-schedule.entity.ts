import { Model } from "src/models/model";
import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Event } from "src/event/event.entity";

/**
 * @class EventHasSchedule
 * @description Represents the relationship between events and external link
 */
@Entity({ name: "eventHasSchedule" })
export class EventHasSchedule extends Model {
  @Column()
  eventId: number = 0;

  @Column()
  date: Date = new Date();

  @ManyToOne(() => Event, (event) => event.eventHasSchedule)
  event: Event;

  get Event() {
    return this.event;
  }
}
