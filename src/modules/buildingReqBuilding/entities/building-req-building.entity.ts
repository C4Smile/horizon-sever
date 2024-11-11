import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";

@Entity({ name: "building-req-buildings" })
export class BuildingReqBuilding {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  buildingReqId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Building, (building) => building.buildingRequirements, { cascade: true })
  building: Building;

  @ManyToOne(() => Building, (building) => building.buildingsRequireThis, { cascade: true })
  buildingReq: Building;
}
