import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Tech } from "src/modules/tech/entities/tech.entity";

@Entity({ name: "tech-types" })
export class TechType extends Model {
  @Column({ type: "text" })
  name: string = "";

  @ManyToOne(() => Tech, (tech) => tech.type)
  techs: Tech[];
}
