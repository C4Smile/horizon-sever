import { Column, Entity } from "typeorm";

// entities
import { Model } from "src/models/model";

/**
 * @class Tag
 * @description Represents an external link
 */
@Entity({ name: "external-link" })
export class ExternalLink extends Model {
  @Column({ type: "text", unique: true })
  name: string = "";

  @Column({ type: "text", unique: true })
  preview: string = "";
}
