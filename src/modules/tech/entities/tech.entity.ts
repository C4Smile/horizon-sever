import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";
import { TechType } from "src/modules/techType/entities/tech-type.entity";

@Entity({ name: "techs" })
export class Tech extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "int" })
  typeId: number = 0;

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "real" })
  creationTime: number = 0;

  @ManyToOne(() => Photo)
  image: Photo;

  @ManyToOne(() => TechType, { cascade: true })
  type: TechType;
}
