import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

// entities
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";

@Entity({ name: "resources" })
export class Resource {
  @PrimaryColumn({ type: "int" })
  id: number;

  @PrimaryColumn({ type: "int" })
  playerId: number;

  @ManyToOne(() => HorizonUser, (horizonRole) => horizonRole.resources, { cascade: true })
  player: HorizonUser;

  @Column({ type: "float" })
  inStock: number = 0;

  @Column({ type: "float" })
  maxCapacity: number = 0;

  @Column({ type: "float" })
  currentFactor: number;
}
