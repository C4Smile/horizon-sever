import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Building } from "src/modules/building/entities/building.entity";
import { Photo } from "src/modules/image/image.entity";

@Entity({ name: "building-types" })
export class BuildingType extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @OneToMany(() => Building, (building) => building.type)
  buildings: Building[];

  @ManyToOne(() => Photo)
  image: Photo;
}
