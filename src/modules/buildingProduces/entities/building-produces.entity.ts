import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";

@Entity({ name: "building-produce" })
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
  baseProduction: number;

  @ManyToOne(() => Building, (building) => building.produces, { cascade: true })
  building: Building[];
}
