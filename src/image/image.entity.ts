import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Event } from "src/event/event.entity";
import { News } from "src/news/news.entity";
import { Room } from "src/room/room.entity";
import { Activity } from "src/activity/activity.entity";
import { Service } from "src/service/service.entity";
import { PushNotification } from "src/pushNotification/push-notification.entity";
import { RoomArea } from "src/room-area/room-area.entity";

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

  @ManyToMany(() => RoomArea, (roomArea) => roomArea.roomAreaHasImage, { cascade: true })
  roomAreas: RoomArea[];

  @OneToMany(() => Activity, (activity) => activity.image, { cascade: true })
  activities: Activity;

  @OneToMany(() => Service, (service) => service.image, { cascade: true })
  services: Service;

  @OneToMany(() => PushNotification, (pushNotification) => pushNotification.image, { cascade: true })
  pushNotifications: PushNotification;

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
   * @returns RoomAreas
   */
  get RoomAreas() {
    return this.roomAreas;
  }
}
