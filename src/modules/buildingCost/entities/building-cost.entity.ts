import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Resource } from "src/modules/resource/entities/resource.entity";
import { Building } from "src/modules/building/entities/building.entity";

@Entity({ name: "building-costs" })
export class BuildingCost {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  factor: number;

  @Column({ type: "float" })
  base: number;

  @ManyToOne(() => Building, (building) => building.costs, { cascade: true })
  building: Building;

  @ManyToOne(() => Resource, (resource) => resource.buildingsCostThis, { cascade: true })
  resource: Resource;
}
