import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";
import { Resource } from "src/modules/resource/entities/resource.entity";

@Entity({ name: "building-cost" })
export class BuildingCost {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  cost: number;

  @ManyToOne(() => Building, (building) => building.costs, { cascade: true })
  building: Building;

  @ManyToOne(() => Resource, (resource) => resource.buildingCosts, { cascade: true })
  resource: Resource;
}
