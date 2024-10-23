import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";

@Entity({ name: "building-tech-req" })
export class BuildingTechReq {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  techId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Building, (building) => building.techRequirements, { cascade: true })
  building: Building[];
}
