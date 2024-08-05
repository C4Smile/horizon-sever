import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class Event
 * @description Represents the relationship between an event and an image
 */
@Entity({ name: "event-has-image" })
export class EventHasImage {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  eventId: number;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  imageId: number;
}
