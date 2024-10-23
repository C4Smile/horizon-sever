import { Column, Entity } from "typeorm";

// entities
import { Model } from "src/modules/models/model";

/**
 * @class AppText
 * @description Represents an app text
 */
@Entity({ name: "app-texts" })
export class AppText extends Model {
  @Column({ type: "text" })
  title: string = "";

  @Column({ type: "text" })
  urlName: string = "";

  @Column({ type: "text" })
  content: string = "";
}
