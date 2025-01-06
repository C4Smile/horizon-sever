import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum BuildingQueueActions {
  Building,
  Upgrading,
  Downgrading,
  Demolishing,
}

@Entity({ name: "buildingQueues" })
export class BuildingQueue {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({ type: "int" })
  buildingId: number;

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
}
