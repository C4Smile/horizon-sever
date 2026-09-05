import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entity
import { PlayerBuilding } from "./player-building.entity";

export enum BuildingQueueActions {
  Building,
  Upgrading,
  Downgrading,
  Demolishing,
}

export enum BuildingQueueState {
  Enqueued,
  Started,
  Cancelled,
  Completed,
  Failed,
}

@Entity({ name: "building-queues" })
export class BuildingQueue {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  /** the player-buildings row, not the catalogue one */
  @Column({ type: "int" })
  buildingId: number;

  @ManyToOne(() => PlayerBuilding)
  building: PlayerBuilding;

  @Column({ type: "int" })
  playerId: number;

  @Column({ type: "int" })
  action: number = 0;

  @Column({ nullable: true, type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  startedAt: Date;

  @Column({ nullable: true, type: "datetime" })
  endsAt: Date;

  @Column({ type: "int" })
  state: BuildingQueueState;
}
