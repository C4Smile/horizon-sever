import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Tag } from "src/tags/tag.entity";
import { Photo } from "src/image/image.entity";
import { ExternalLink } from "src/externalLink/external-link.entity";
import { EventHasSchedule } from "src/eventHasSchedule/event-has-schedule.entity";

/**
 * @class Event
 * @description Represents a event
 */
@Entity({ name: "events" })
export class Event extends Model {
  @Column({ unique: true })
  title: string = "";

  @Column({ unique: true })
  urlName: string = "";

  @Column()
  description: string = "";

  @Column()
  content: string = "";

  @Column()
  subtitle: string = "";

  @Column()
  address: string = "";

  @Column()
  location: string = "";

  //#region Relationships

  @ManyToMany(() => Tag, (tag) => tag.Events, { cascade: true })
  @JoinTable({
    name: "event-tags",
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
    name: "event-image",
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

  @OneToMany(() => EventHasSchedule, (schedule) => schedule.Event, { cascade: true })
  eventHasSchedule: EventHasSchedule[];

  @ManyToMany(() => ExternalLink, (link) => link.Events, { cascade: true })
  @JoinTable({
    name: "event-link",
    joinColumn: {
      name: "eventId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "eventLinkEventId",
    },
    inverseJoinColumn: {
      name: "linkId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "eventLinksLinkId",
    },
  })
  eventHasLink: ExternalLink[];

  //#endregion
}
