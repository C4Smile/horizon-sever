import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";


@Entity({ name: "tech-types" })
export class TechType extends Model {
  @Column({ type: "text" })
  name: string = "";
}
