import { Column, Entity } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";

/**
 * @class Tag
 * @description Represents an external link
 */
@Entity({ name: "external-link" })
export class ExternalLink extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string = "";

  @AutoMap()
  @Column({ type: "text", unique: true })
  preview: string = "";
}
