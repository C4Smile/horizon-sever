import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class EventHasImage
 * @description Represents the relationship between news and images
 */
@Entity({ name: "newsHasImage" })
export class EventHasImage {
  @PrimaryColumn()
  newsId: number = 0;

  @PrimaryColumn()
  imageId: number = 0;
}
