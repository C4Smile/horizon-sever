import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { Ship } from "src/modules/ship/entities/ship.entity";
import { Tech } from "src/modules/tech/entities/tech.entity";

@Entity({ name: "ship-req-techs" })
export class ShipReqTech {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  shipId: number;

  @Column({ type: "int" })
  techReqId: number;

  @Column({ type: "int" })
  level: number;

  @ManyToOne(() => Ship, (ship) => ship.techRequirements, { cascade: true })
  ship: Ship;

  @ManyToOne(() => Tech, (tech) => tech.shipsRequireThis, { cascade: true })
  techReq: Tech;
}
