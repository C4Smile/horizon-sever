import { Model } from "src/models/model";
import { News } from "src/news/news.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: "images" })
export class Image extends Model {
  @Column({ unique: true })
  fileName: string;

  @Column({ unique: true })
  url: string;

  @OneToMany(() => News, (news) => news.photo)
  news: News[];

  @OneToMany(() => User, (user) => user.photo)
  users: User[];

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

  /**
   * @returns Users
   */
  get Users() {
    return this.users;
  }
}
