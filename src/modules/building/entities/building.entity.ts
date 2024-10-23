import { Column, Entity, OneToMany } from "typeorm";

// dto
import { Model } from "src/modules/models/model";
import { BuildingCost } from "src/modules/buildingCost/entities/building-cost.entity";
import { BuildingTechReq } from "src/modules/buildingTechReq/entities/building-tech-req.entity";
import { BuildingUpkeep } from "src/modules/buildingUpkeep/entities/building-upkeep.entity";

@Entity({ name: "buildings" })
export class Building extends Model {
  @Column({ type: "text" })
  name: string = "";

  @Column({ type: "int" })
  baseFactor: number = 0;

  @Column({ type: "int" })
  baseUpkeep: number = 0;

  @Column({ type: "text" })
  description: string = "";

  @OneToMany(() => BuildingCost, (cost) => cost.building)
  costs: BuildingCost[];

  @OneToMany(() => BuildingTechReq, (techReq) => techReq.building)
  techRequirements: BuildingTechReq[];

  @OneToMany(() => BuildingUpkeep, (upkeep) => upkeep.building)
  upkeeps: BuildingUpkeep[];
}
