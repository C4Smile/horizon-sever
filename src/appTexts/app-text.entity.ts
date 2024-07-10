import { Column, Entity } from "typeorm";

// entities
import { Model } from "src/models/model";

/**
 * @class AppText
 * @description Represents an app text
 */
@Entity({ name: "appTexts" })
export class AppText extends Model {
  @Column({ unique: true })
  title: string = "";

  @Column({ unique: true })
  urlName: string = "";

  @Column()
  content: string = "";
}
