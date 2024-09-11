import { Column, Entity } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";

/**
 * @class Lang
 * @description Represents a room status
 */
@Entity({ name: "app" })
export class Lang extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string = "";

  @AutoMap()
  @Column({ type: "text", unique: true })
  code: string = "";
}
