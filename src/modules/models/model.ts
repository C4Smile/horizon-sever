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
  createdAt: Date;

  @Column({
    nullable: true,
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  /** when the row was soft deleted, null while it is active */
  @Column({ nullable: true, type: "datetime", default: null })
  deletedAt: Date | null = null;

  @Column({ default: () => 0, type: "int" })
  lockedBy: number = 0;
}
