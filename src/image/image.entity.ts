import { Model } from "src/models/model";
import { News } from "src/news/news.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: "images" })
export class Image extends Model {
  @Column({ unique: true })
  fileName: string;

  @Column({ unique: true })
  url: string;

  @OneToMany(() => News, (news) => news.photo)
  news: News[];

  /**
   * @returns FileName
   */
  get FileName() {
    return this.fileName;
  }

  /**
   * @returns Url
   */
  get Url() {
    return this.url;
  }

  /**
   * @returns News
   */
  get News() {
    return this.news;
  }
}
