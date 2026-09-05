import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entities
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";

export enum BuildingState {
  Constructing,
  Working,
  Demolished,
  Inactive,
}

/**
 * What one player has built of one catalogue building. Like the resource
 * stock, this is live state: no soft delete, no timestamps.
 */
@Entity({ name: "player-buildings" })
export class PlayerBuilding {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  /** the catalogue building this is an instance of */
  @Column({ type: "int" })
  buildingId: number;

  @Column({ type: "int" })
  playerId: number;

  @ManyToOne(() => HorizonUser)
  player: HorizonUser;

  @Column({ type: "int" })
  level: number = 0;

  @Column({ type: "int" })
  state: BuildingState;
}
