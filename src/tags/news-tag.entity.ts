import { Column, Entity, ManyToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { News } from "src/news/news.entity";

/**
 * @class NewsTag
 * @description Represents a country
 */
@Entity({ name: "countries" })
export class Tag extends Model {
  @Column({ unique: true })
  name: string = "";

  @ManyToMany(() => News, (news) => news.Tags)
  news: News[];

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
}