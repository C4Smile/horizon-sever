import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// dto
import { Model } from "src/modules/models/model";
import { BuildingCosts } from "src/modules/buildingCosts/entities/building-costs.entity";
import { BuildingReqTech } from "src/modules/buildingReqTech/entities/building-req-tech.entity";
import { BuildingUpkeep } from "src/modules/buildingUpkeep/entities/building-upkeep.entity";
import { BuildingProduces } from "src/modules/buildingProduces/entities/building-produces.entity";
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

  @OneToMany(() => BuildingReqTech, (techReq) => techReq.building)
  techRequirements: BuildingReqTech[];

  @OneToMany(() => BuildingUpkeep, (upkeep) => upkeep.building)
  upkeeps: BuildingUpkeep[];

  @OneToMany(() => BuildingProduces, (production) => production.building)
  produces: BuildingProduces;

  @ManyToOne(() => Photo)
  image: Photo;
}
