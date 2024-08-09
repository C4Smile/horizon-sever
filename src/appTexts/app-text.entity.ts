import { Column, Entity } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";

/**
 * @class AppText
 * @description Represents an app text
 */
@Entity({ name: "app-texts" })
export class AppText extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  title: string = "";

  @AutoMap()
  @Column({ type: "text", unique: true })
  urlName: string = "";

  @AutoMap()
  @Column({ type: "text" })
  content: string = "";
}
