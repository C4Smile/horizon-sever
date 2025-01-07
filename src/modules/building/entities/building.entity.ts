import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";

export enum BuildingState {
  Constructing,
  Working,
  Demolished,
  Inactive,
}

@Entity({ name: "buildings" })
export class Building {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  playerId: number;

  @ManyToOne(() => HorizonUser, (horizonUser) => horizonUser.buildings, { cascade: true })
  player: HorizonUser;

  @Column({ type: "int" })
  level: number = 0;

  @Column({ type: "int" })
  state: BuildingState;
}
