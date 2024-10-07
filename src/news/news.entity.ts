import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Photo } from "src/image/image.entity";
import { Model } from "src/models/model";
import { Tag } from "src/tags/tag.entity";

/**
 * @class News
 * @description Represents a news
 */
@Entity({ name: "news" })
export class News extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  title: string = "";

  @AutoMap()
  @Column({ type: "text", unique: true })
  urlName: string = "";

  @AutoMap()
  @Column({ type: "text" })
  content: string = "";

  @AutoMap()
  @Column({ type: "text" })
  subtitle: string = "";

  @ManyToMany(() => Tag, (newsTag) => newsTag.News, { cascade: true })
  @AutoMap()
  @JoinTable({
    name: "news-has-tag",
    joinColumn: {
      name: "newsId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "newsTagsNewsId",
    },
    inverseJoinColumn: {
      name: "tagId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "newsTagsTagId",
    },
  })
  newsHasTag: Tag[];

  @ManyToMany(() => Photo, (image) => image.News)
  @JoinTable({
    name: "news-has-image",
    joinColumn: {
      name: "newsId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "newsImagesNewsId",
    },
    inverseJoinColumn: {
      name: "imageId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "newsImagesImageId",
    },
  })
  newsHasImage: Photo[];
}
