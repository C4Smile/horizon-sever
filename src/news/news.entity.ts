import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

// entities
import { Image } from "src/image/image.entity";
import { Model } from "src/models/model";
import { Province } from "src/province/province.entity";
import { Tag } from "src/tags/tag.entity";

/**
 * @class News
 * @description Represents a news
 */
@Entity({ name: "news" })
export class News extends Model {
  @Column({ unique: true })
  title: string = "";

  @Column()
  description: string = "";

  @Column()
  provinceId: number;

  @ManyToOne(() => Province, (province) => province.News)
  province: Province;

  @ManyToOne(() => Image, (image) => image.News)
  photo: Image;

  @ManyToMany(() => Tag, (newsTag) => newsTag.News)
  tags: Tag[];

  /**
   * @returns Title
   */
  get Title() {
    return this.title;
  }

  /**
   * @returns Description
   */
  get Description() {
    return this.description;
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
  get Tags() {
    return this.tags;
  }

  /**
   * @returns Photo
   */
  get Photo() {
    return this.photo;
  }
}
