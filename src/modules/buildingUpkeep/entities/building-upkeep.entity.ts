import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Resource } from "src/modules/resource/entities/resource.entity";
import { Building } from "src/modules/building/entities/building.entity";

@Entity({ name: "building-upkeeps" })
export class BuildingUpkeep {
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

  @ManyToOne(() => Building, (building) => building.upkeeps, { cascade: true })
  building: Building;

  @ManyToOne(() => Resource, (resource) => resource.buildingsUpkeepThis, { cascade: true })
  resource: Resource;
}
