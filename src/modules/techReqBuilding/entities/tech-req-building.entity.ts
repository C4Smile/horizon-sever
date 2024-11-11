import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Tech } from "src/modules/tech/entities/tech.entity";
import { Building } from "src/modules/building/entities/building.entity";

@Entity({ name: "tech-req-buildings" })
export class TechReqBuilding {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  techId: number;

  @Column({ type: "int" })
  buildingReqId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Tech, (tech) => tech.techRequirements, { cascade: true })
  tech: Tech;

  @ManyToOne(() => Building, (building) => building.techsRequireThis, { cascade: true })
  buildingReq: Building;
}
