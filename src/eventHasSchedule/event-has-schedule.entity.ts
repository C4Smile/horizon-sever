import { Model } from "src/models/model";
import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Event } from "src/event/event.entity";

/**
 * @class EventHasSchedule
 * @description Represents the relationship between events and external link
 */
@Entity({ name: "event-has-schedule" })
export class EventHasSchedule extends Model {
  @Column({ type: "int" })
  eventId: number = 0;

  @Column({ type: "text" })
  description: string = "";

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date = new Date();

  @ManyToOne(() => Event, (event) => event.eventHasSchedule)
  event: Event;

  get Event() {
    return this.event;
  }
}
