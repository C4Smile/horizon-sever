import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Tech } from "src/modules/tech/entities/tech.entity";

@Entity({ name: "building-tech-req" })
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
}
