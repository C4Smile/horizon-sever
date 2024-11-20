import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Resource } from "src/modules/resource/entities/resource.entity";
import { Ship } from "src/modules/ship/entities/ship.entity";

@Entity({ name: "ship-costs" })
export class ShipCost {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  shipId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  factor: number;

  @Column({ type: "float" })
  base: number;

  @ManyToOne(() => Ship, (ship) => ship.costs, { cascade: true })
  ship: Ship;

  @ManyToOne(() => Resource, (resource) => resource.shipsCostThis, { cascade: true })
  resource: Resource;
}
