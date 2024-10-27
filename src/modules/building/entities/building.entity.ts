import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// dto
import { Model } from "src/modules/models/model";
import { BuildingCosts } from "src/modules/buildingCosts/entities/building-costs.entity";
import { BuildingTechReq } from "src/modules/buildingTechReq/entities/building-tech-req.entity";
import { BuildingUpkeep } from "src/modules/buildingUpkeep/entities/building-upkeep.entity";
import { BuildingProduce } from "src/modules/buildingProduces/entities/building-produces.entity";
import { Photo } from "src/modules/image/image.entity";

@Entity({ name: "buildings" })
export class Building extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "text" })
  description: string = "";

  @OneToMany(() => BuildingCosts, (cost) => cost.building)
  costs: BuildingCosts[];

  @OneToMany(() => BuildingTechReq, (techReq) => techReq.building)
  techRequirements: BuildingTechReq[];

  @OneToMany(() => BuildingUpkeep, (upkeep) => upkeep.building)
  upkeeps: BuildingUpkeep[];

  @OneToMany(() => BuildingProduce, (production) => production.building)
  produces: BuildingProduce;

  @ManyToOne(() => Photo)
  image: Photo;
}
