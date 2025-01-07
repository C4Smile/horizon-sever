import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// entity
import { Building } from "./building.entity";

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

  @Column({ type: "int" })
  buildingId: number;

  @ManyToOne(() => Building)
  building: Building;

  @Column({ type: "int" })
  playerId: number;

  @Column({ type: "int" })
  action: number = 0;

  @Column({
    nullable: true,
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  startedAt: Date;

  @Column({
    nullable: true,
    type: "datetime",
  })
  endsAt: Date;

  @Column({ type: "int" })
  state: BuildingQueueState;
}
