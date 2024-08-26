import { Column, Entity } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";

/**
 * @class App
 * @description Represents a room status
 */
@Entity({ name: "app" })
export class App extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string = "";
}
