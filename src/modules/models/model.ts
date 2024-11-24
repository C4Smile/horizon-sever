import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * @class Model
 * @description Base class for all entities
 */
@Entity()
export class Model {
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @Column({ nullable: true, type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  dateOfCreation: Date;

  @Column({
    nullable: true,
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date;

  @Column({ nullable: true, default: () => false })
  deleted: boolean = false;

  @Column({ default: () => 0, type: "int" })
  lockedBy: number = 0;
}
