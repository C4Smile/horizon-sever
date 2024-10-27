import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { BuildingCosts } from "src/modules/buildingCosts/entities/building-costs.entity";
import { BuildingProduces } from "src/modules/buildingProduces/entities/building-produces.entity";
import { Building } from "src/modules/building/entities/building.entity";
import { TechCosts } from "src/modules/techCosts/entities/tech-costs.entity";
import { Photo } from "src/modules/image/image.entity";
import { Tech } from "src/modules/tech/entities/tech.entity";
import { TechProduces } from "src/modules/techProduces/entities/tech-produces.entity";
import { BuildingUpkeep } from "src/modules/buildingUpkeep/entities/building-upkeep.entity";

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

  @OneToMany(() => BuildingCosts, (cost) => cost.resource)
  buildingCosts: BuildingCosts[];

  @OneToMany(() => BuildingProduces, (produce) => produce.resource)
  buildingsProduceThis: Building[];

  @OneToMany(() => BuildingUpkeep, (produce) => produce.resource)
  buildingsUpkeepThis: Building[];

  @OneToMany(() => TechCosts, (cost) => cost.resource)
  techCosts: TechCosts[];

  @OneToMany(() => TechProduces, (produce) => produce.resource)
  techsProduceThis: Tech[];

  @ManyToOne(() => Photo)
  image: Photo;
}
