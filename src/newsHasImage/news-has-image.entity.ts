import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryColumn } from "typeorm";

/**
 * @class News
 * @description Represents a room
 */
@Entity({ name: "news-has-image" })
export class NewsHasImage {
  @AutoMap()
  @PrimaryColumn({ type: "int" })
  newsId: number;

  @AutoMap()
  @PrimaryColumn({ type: "int" })
  imageId: number;
}
