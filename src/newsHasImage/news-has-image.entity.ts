import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class NewsHasImage
 * @description Represents the relationship between news and images
 */
@Entity({ name: "newsHasImage" })
export class NewsHasImage {
  @PrimaryColumn()
  newsId: number = 0;

  @PrimaryColumn()
  imageId: number = 0;
}
