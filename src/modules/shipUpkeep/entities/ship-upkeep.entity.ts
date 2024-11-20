import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Resource } from "src/modules/resource/entities/resource.entity";
import { Ship } from "src/modules/ship/entities/ship.entity";

@Entity({ name: "ship-upkeeps" })
export class ShipUpkeep {
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

  @ManyToOne(() => Ship, (ship) => ship.upkeeps, { cascade: true })
  ship: Ship;

  @ManyToOne(() => Resource, (resource) => resource.shipsUpkeepThis, { cascade: true })
  resource: Resource;
}
