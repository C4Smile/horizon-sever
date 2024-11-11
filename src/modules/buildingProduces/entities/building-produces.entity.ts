import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";
import { Resource } from "src/modules/resource/entities/resource.entity";

@Entity({ name: "building-produces" })
export class BuildingProduces {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  factor: number = 0;

  @Column({ type: "float" })
  base: number;

  @ManyToOne(() => Building, (building) => building.produces, { cascade: true })
  building: Building[];

  @ManyToOne(() => Resource, (resource) => resource.buildingsProduceThis, { cascade: true })
  resource: Resource;
}
