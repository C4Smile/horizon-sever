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
  @Column({ unique: true })
  title: string = "";

  @Column({ unique: true })
  urlName: string = "";

  @Column()
  description: string = "";

  @Column()
  content: string = "";

  @Column()
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
