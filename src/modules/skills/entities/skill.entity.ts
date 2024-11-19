import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";

@Entity({ name: "skills" })
export class Skill extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "text" })
  description: string = "";

  @ManyToOne(() => Photo)
  image: Photo;
}
