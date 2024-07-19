import { Column, Entity } from "typeorm";

// entities
import { Model } from "src/models/model";

/**
 * @class AppText
 * @description Represents an app text
 */
@Entity({ name: "app-texts" })
export class AppText extends Model {
  @Column({ type: "text", unique: true })
  title: string = "";

  @Column({ type: "text", unique: true })
  urlName: string = "";

  @Column({ type: "text" })
  content: string = "";
}
