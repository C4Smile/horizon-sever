import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Province } from "src/province/province.entity";
import { NewsTag } from "src/news-tag/news-tag.entity";

/**
 * @class News
 * @description Represents a news
 */
@Entity({ name: "news" })
export class News extends Model {
  @Column({ unique: true })
  title: string = "";

  @Column()
  provinceId: number;

  @ManyToOne(() => Province, (province) => province.News)
  province: Province;

  @ManyToMany(() => NewsTag, (newsTag) => newsTag.News)
  newsTags: NewsTag[];

  /**
   * @returns Title
   */
  get Title() {
    return this.title;
  }

  /**
   * @returns Province
   */
  get Province() {
    return this.province;
  }

  /**
   * @returns NewsTags
   */
  get NewsTags() {
    return this.newsTags;
  }
}