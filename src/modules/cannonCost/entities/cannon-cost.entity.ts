import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Resource } from "src/modules/resource/entities/resource.entity";
import { Cannon } from "src/modules/cannon/entities/cannon.entity";

@Entity({ name: "cannon-costs" })
export class CannonCost {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  cannonId: number;

  @Column({ type: "int" })
  resourceId: number;

  @Column({ type: "float" })
  factor: number;

  @Column({ type: "float" })
  base: number;

  @ManyToOne(() => Cannon, (cannon) => cannon.costs, { cascade: true })
  cannon: Cannon;

  @ManyToOne(() => Resource, (resource) => resource.cannonsCostThis, { cascade: true })
  resource: Resource;
}
