import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * @class Model
 * @description Base class for all entities
 */
@Entity()
export class Model {
  @AutoMap()
  @PrimaryGeneratedColumn("increment")
  id: number = 0;

  @AutoMap()
  @Column({ nullable: true, type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  dateOfCreation: Date = null;

  @AutoMap()
  @Column({
    nullable: true,
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date = null;

  @AutoMap()
  @Column({ nullable: true, default: () => false })
  deleted: boolean = false;
}
