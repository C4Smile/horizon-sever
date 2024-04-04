import { Model } from "src/models/model";
import { Column, Entity } from "typeorm";

export enum RoomStatus {
  operational = "operational",
  maintenance = "maintenance",
}

/**
 * @class Room
 * @description Represents a room
 */
@Entity({ name: "rooms" })
export class Room extends Model {
  @Column({ unique: true })
  number: string = "";

  @Column({ unique: true })
  name: string = "";

  @Column({ type: "string", default: () => RoomStatus.operational })
  status: RoomStatus = RoomStatus.operational;

  /**
   * @param {number} id - Room id
   * @param {string} number - Room number
   * @param {string} name - Room name
   * @param {RoomStatus} status - Room status
   * @param {Date} dateOfCreation - Room date of creation
   * @param {Date} lastUpdate - Room last update
   * @param {boolean} deleted - Room deleted
   * @returns Room instance
   */
  constructor(
    id: number,
    number: string,
    name: string,
    status: RoomStatus = RoomStatus.operational,
    dateOfCreation: Date,
    lastUpdate: Date,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.number = number;
    this.name = name;
    this.status = status;
  }

  /**
   * @returns Number
   */
  get Number() {
    return this.number;
  }

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns Status
   */
  get Status() {
    return this.status;
  }
}
