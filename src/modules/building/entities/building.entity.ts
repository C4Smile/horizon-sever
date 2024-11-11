import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// dto
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";
import { BuildingType } from "src/modules/buildingType/entities/building-type.entity";
import { BuildingProduces } from "src/modules/buildingProduces/entities/building-produces.entity";
import { BuildingCost } from "src/modules/buildingCost/entities/building-cost.entity";
import { BuildingUpkeep } from "src/modules/buildingUpkeep/entities/building-upkeep.entity";
import { BuildingReqBuilding } from "src/modules/buildingReqBuilding/entities/building-req-building.entity";
import { TechReqBuilding } from "src/modules/techReqBuilding/entities/tech-req-building.entity";
import { BuildingReqTech } from "src/modules/buildingReqTech/entities/building-req-tech.entity";

@Entity({ name: "buildings" })
export class Building extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  imageId: number;

  @Column({ type: "int" })
  typeId: number = 0;

  @Column({ type: "text" })
  description: string = "";

  @ManyToOne(() => Photo)
  image: Photo;

  @ManyToOne(() => BuildingType, { cascade: true })
  type: BuildingType;

  @OneToMany(() => BuildingProduces, (production) => production.building)
  produces: BuildingProduces;

  @OneToMany(() => BuildingCost, (cost) => cost.building)
  costs: BuildingCost[];

  @OneToMany(() => BuildingUpkeep, (upkeep) => upkeep.building)
  upkeeps: BuildingUpkeep[];

  @OneToMany(() => BuildingReqTech, (techReq) => techReq.building)
  techRequirements: BuildingReqTech[];

  @OneToMany(() => TechReqBuilding, (buildingReq) => buildingReq.buildingReq)
  techsRequireThis: TechReqBuilding[];

  @OneToMany(() => BuildingReqBuilding, (buildingReq) => buildingReq.building)
  buildingRequirements: BuildingReqBuilding[];

  @OneToMany(() => BuildingReqBuilding, (buildingReq) => buildingReq.buildingReq)
  buildingsRequireThis: BuildingReqBuilding[];
}
