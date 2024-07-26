import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from "typeorm";

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

  @OneToOne(() => Activity, (activity) => activity.image)
  @JoinColumn()
  activity: Activity;

  @OneToOne(() => Service, (service) => service.image)
  @JoinColumn()
  service: Service;

  @OneToOne(() => Activity, (pushNotification) => pushNotification.image)
  @JoinColumn()
  pushNotification: PushNotification;

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
