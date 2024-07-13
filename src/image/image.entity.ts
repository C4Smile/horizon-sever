import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Event } from "src/event/event.entity";
import { News } from "src/news/news.entity";
import { Room } from "src/room/room.entity";
import { User } from "src/user/user.entity";
import { Activity } from "src/activity/activity.entity";

@Entity({ name: "images" })
export class Photo extends Model {
  @Column({ type: "text", unique: true })
  fileName: string;

  @Column({ type: "text", unique: true })
  url: string;

  @ManyToMany(() => News, (news) => news.newsHasImage, { cascade: true })
  news: News[];

  @ManyToMany(() => Event, (event) => event.eventHasImage, { cascade: true })
  events: Event[];

  @ManyToMany(() => Room, (room) => room.roomHasImage, { cascade: true })
  rooms: Room[];

  @OneToMany(() => User, (user) => user.photo)
  users: User[];

  @OneToMany(() => Activity, (activity) => activity.image)
  activities: Activity[];

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
   * @returns Rooms
   */
  get Rooms() {
    return this.rooms;
  }

  /**
   * @return Users
   */
  get Users() {
    return this.users;
  }

  /**
   * @return Activities
   */
  get Activities() {
    return this.activities;
  }
}
