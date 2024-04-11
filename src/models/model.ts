import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * @class Model
 * @description Base class for all entities
 */
@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ nullable: true, type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  dateOfCreation: Date = null;

  @Column({ nullable: true, type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  lastUpdate: Date = null;

  @Column({ nullable: true })
  deleted: boolean = false;

  /**
   * @param {number} id - Entity id
   * @param {Date} dateOfCreation - Entity date of creation
   * @param {Date} lastUpdate - Entity last update
   * @param {boolean} deleted - Entity deleted
   * @returns Entity instance
   */
  constructor(id: number, dateOfCreation: Date, lastUpdate: Date, deleted: boolean = false) {
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
