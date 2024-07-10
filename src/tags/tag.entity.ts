import { Column, Entity, ManyToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { News } from "src/news/news.entity";
import { Event } from "src/event/event.entity";

/**
 * @class Tag
 * @description Represents a country
 */
@Entity({ name: "tags" })
export class Tag extends Model {
  @Column({ unique: true })
  name: string = "";

  @ManyToMany(() => News, (news) => news.newsHasTag)
  news: News[];

  @ManyToMany(() => Event, (event) => event.eventHasTag)
  events: Event[];

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

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
}
