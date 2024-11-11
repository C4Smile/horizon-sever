import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Tech } from "src/modules/tech/entities/tech.entity";

@Entity({ name: "tech-req-techs" })
export class TechReqTech {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  techId: number;

  @Column({ type: "int" })
  techReqId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Tech, (tech) => tech.techRequirements, { cascade: true })
  tech: Tech;

  @ManyToOne(() => Tech, (tech) => tech.techsRequireThis, { cascade: true })
  techReq: Tech;
}