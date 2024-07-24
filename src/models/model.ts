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

  /**
   * @param {number} id - Entity id
   * @param {Date} dateOfCreation - Entity date of creation
   * @param {Date} lastUpdate - Entity last update
   * @param {boolean} deleted - Entity deleted
   * @returns Entity instance
   */
  constructor(
    id: number,
    dateOfCreation: Date = new Date(),
    lastUpdate: Date = new Date(),
    deleted: boolean = false,
  ) {
    this.id = id;
    this.dateOfCreation = dateOfCreation;
    this.lastUpdate = lastUpdate;
    this.deleted = deleted;
  }

  /**
   * @returns Id
   */
  get Id() {
    return this.id;
  }

  /**
   * @returns DateOfCreation
   */
  get DateOfCreation() {
    return this.dateOfCreation;
  }

  /**
   * @returns LastUpdate
   */
  get LastUpdate() {
    return this.lastUpdate;
  }

  /**
   * @returns Deleted
   */
  get Deleted() {
    return this.deleted;
  }
}
