import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Cannon } from "src/modules/cannon/entities/cannon.entity";
import { Tech } from "src/modules/tech/entities/tech.entity";

@Entity({ name: "cannon-req-techs" })
export class CannonReqTech {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  cannonId: number;

  @Column({ type: "int" })
  techReqId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Cannon, (cannon) => cannon.techRequirements, { cascade: true })
  cannon: Cannon;

  @ManyToOne(() => Tech, (tech) => tech.cannonsRequireThis, { cascade: true })
  techReq: Tech;
}
