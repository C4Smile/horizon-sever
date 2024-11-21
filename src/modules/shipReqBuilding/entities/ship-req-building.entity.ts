import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";
import { Ship } from "src/modules/ship/entities/ship.entity";

@Entity({ name: "ship-req-buildings" })
export class ShipReqBuilding {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  shipId: number;

  @Column({ type: "int" })
  buildingReqId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Ship, (ship) => ship.buildingRequirements, { cascade: true })
  ship: Ship;

  @ManyToOne(() => Building, (building) => building.buildingsRequireThis, { cascade: true })
  buildingReq: Building;
}
