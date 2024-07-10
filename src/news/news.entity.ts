import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

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
  @Column({ type: "text", unique: true })
  title: string = "";

  @Column({ type: "text", unique: true })
  urlName: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "text" })
  subtitle: string = "";

  @ManyToMany(() => Tag, (newsTag) => newsTag.News, { cascade: true })
  @JoinTable({
    name: "news-tag",
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
    name: "news-image",
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
