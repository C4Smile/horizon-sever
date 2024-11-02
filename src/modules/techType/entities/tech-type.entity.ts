import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Tech } from "src/modules/tech/entities/tech.entity";
import { Photo } from "src/modules/image/image.entity";

@Entity({ name: "tech-types" })
export class TechType extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @OneToMany(() => Tech, (tech) => tech.type)
  techs: Tech[];

  @ManyToOne(() => Photo)
  image: Photo;
}
