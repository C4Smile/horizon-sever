import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Tech } from "src/modules/tech/entities/tech.entity";
import { Resource } from "src/modules/resource/entities/resource.entity";

@Entity({ name: "tech-produces" })
export class TechProduces {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  techId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  factor: number = 0;

  @Column({ type: "float" })
  baseProduction: number;

  @ManyToOne(() => Tech, (tech) => tech.produces, { cascade: true })
  tech: Tech[];

  @ManyToOne(() => Resource, (resource) => resource.buildingsProduceThis, { cascade: true })
  resource: Resource;
}
