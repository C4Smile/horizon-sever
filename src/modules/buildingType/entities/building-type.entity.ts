import { Entity, Column, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Building } from "src/modules/building/entities/building.entity";

/**
 * A building type is only a name. Nothing draws a picture for one: the game
 * renders its type tabs as text, and the dashboard lists them by name.
 */
@Entity({ name: "building-types" })
export class BuildingType extends Model {
  @Column({ type: "text" })
  name: string = "";

  @OneToMany(() => Building, (building) => building.type)
  buildings: Building[];
}
