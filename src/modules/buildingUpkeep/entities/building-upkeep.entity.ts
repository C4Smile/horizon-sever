import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";
import { Resource } from "src/modules/resource/entities/resource.entity";

@Entity({ name: "building-upkeep" })
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
  baseUpkeep: number;

  @ManyToOne(() => Building, (building) => building.upkeeps, { cascade: true })
  building: Building;

  @ManyToOne(() => Resource, (resource) => resource.buildingsUpkeepThis, { cascade: true })
  resource: Resource;
}
