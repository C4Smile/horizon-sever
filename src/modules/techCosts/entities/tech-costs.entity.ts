import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Tech } from "src/modules/tech/entities/tech.entity";
import { Resource } from "src/modules/resource/entities/resource.entity";

@Entity({ name: "tech-costs" })
export class TechCosts {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  techId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  factor: number;

  @Column({ type: "float" })
  baseCost: number;

  @ManyToOne(() => Tech, (tech) => tech.costs, { cascade: true })
  tech: Tech;

  @ManyToOne(() => Resource, (resource) => resource.techCosts, { cascade: true })
  resource: Resource;
}
