import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Tag } from "src/tags/tag.entity";
import { Photo } from "src/image/image.entity";
import { EventHasSchedule } from "src/eventHasSchedule/event-has-schedule.entity";
import { EventHasLink } from "src/eventHasLink/event-has-link.entity";

/**
 * @class Event
 * @description Represents a event
 */
@Entity({ name: "events" })
export class Event extends Model {
  @Column({ type: "text", unique: true })
  title: string = "";

  @Column({ type: "text", unique: true })
  urlName: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "text" })
  subtitle: string = "";

  @Column({ type: "text" })
  address: string = "";

  @Column({ type: "text" })
  location: string = "";

  //#region Relationships

  @OneToMany(() => EventHasSchedule, (schedule) => schedule.Event, { cascade: true })
  eventHasSchedule: EventHasSchedule[];

  @OneToMany(() => EventHasLink, (link) => link.Event, { cascade: true })
  eventHasLink: EventHasLink[];

  @ManyToMany(() => Tag, (tag) => tag.Events, { cascade: true })
  @JoinTable({
    name: "event-has-tag",
    joinColumn: {
      name: "eventId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "eventTagsEventId",
    },
    inverseJoinColumn: {
      name: "tagId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "eventTagsTagId",
    },
  })
  eventHasTag: Tag[];

  @ManyToMany(() => Photo, (image) => image.Events)
  @JoinTable({
    name: "event-has-image",
    joinColumn: {
      name: "eventId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "eventImagesEventId",
    },
    inverseJoinColumn: {
      name: "imageId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "eventImagesImageId",
    },
  })
  eventHasImage: Photo[];

  //#endregion
}
