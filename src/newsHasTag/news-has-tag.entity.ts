import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class NewsHasTag
 * @description Represents the relationship between news and images
 */
@Entity({ name: "newsHasTag" })
export class NewsHasTag {
  @PrimaryColumn()
  newsId: number = 0;

  @PrimaryColumn()
  tagId: number = 0;
}
