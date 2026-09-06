import { Entity, Column, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Tech } from "src/modules/tech/entities/tech.entity";

/**
 * A tech type is only a name. Nothing draws a picture for one: the game never
 * asks for it and the dashboard lists them by name.
 */
@Entity({ name: "tech-types" })
export class TechType extends Model {
  @Column({ type: "text" })
  name: string = "";

  @OneToMany(() => Tech, (tech) => tech.type)
  techs: Tech[];
}
