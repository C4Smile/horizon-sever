import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Building } from "src/modules/building/entities/building.entity";
import { Tech } from "src/modules/tech/entities/tech.entity";

@Entity({ name: "building-tech-req" })
export class BuildingReqTech {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  techReqId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Building, (building) => building.techRequirements, { cascade: true })
  building: Building;

  @ManyToOne(() => Tech, (tech) => tech.buildingsRequireThis, { cascade: true })
  tech: Tech;
}