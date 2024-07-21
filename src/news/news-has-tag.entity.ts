import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class NewsHasTag
 * @description Represents the relationship of news with tag
 */
@Entity({ name: "news-has-tag" })
export class NewsHasTag {
  @PrimaryColumn()
  newsId: number = 0;

  @PrimaryColumn()
  tagId: number = 0;
}
