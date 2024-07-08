import { Column, Entity, ManyToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Event } from "src/event/event.entity";
import { News } from "src/news/news.entity";
import { Room } from "src/room/room.entity";

@Entity({ name: "images" })
export class Photo extends Model {
  @Column({ unique: true })
  fileName: string;

  @Column({ unique: true })
  url: string;

  @ManyToMany(() => News, (news) => news.newsHasImage, { cascade: true })
  news: News[];

  @ManyToMany(() => Event, (events) => events.eventHasImage, { cascade: true })
  events: Event[];

  @ManyToMany(() => Room, (rooms) => rooms.eventHasImage, { cascade: true })
  rooms: Room[];

  /**
   * @returns News
   */
  get News() {
    return this.news;
  }

  /**
   * @returns Events
   */
  get Events() {
    return this.events;
  }

  /**
   * @returns Roms
   */
  get Roms() {
    return this.rooms;
  }
}
