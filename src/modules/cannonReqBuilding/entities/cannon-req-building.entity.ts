import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";
import { Cannon } from "src/modules/cannon/entities/cannon.entity";

@Entity({ name: "cannon-req-buildings" })
export class CannonReqBuilding {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  cannonId: number;

  @Column({ type: "int" })
  buildingReqId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Cannon, (cannon) => cannon.buildingRequirements, { cascade: true })
  cannon: Cannon;

  @ManyToOne(() => Building, (building) => building.buildingsRequireThis, { cascade: true })
  buildingReq: Building;
}
