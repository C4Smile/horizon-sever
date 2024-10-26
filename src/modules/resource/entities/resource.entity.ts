import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { BuildingCost } from "src/modules/buildingCost/entities/building-cost.entity";

@Entity({ name: "resources" })
export class Resource extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "int" })
  baseFactor: number = 0;

  @Column({ type: "text" })
  description: string = "";

  @OneToMany(() => BuildingCost, (cost) => cost.resource)
  buildingCosts: BuildingCost[];
}
