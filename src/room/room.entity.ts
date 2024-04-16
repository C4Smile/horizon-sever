import { Column, Entity } from "typeorm";

// entities
import { Model } from "src/models/model";

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
  number: string = "";

  @Column({ unique: true })
  name: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column()
  status: RoomStatus = RoomStatus.operational;

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
   * @returns Description
   */
  get Description() {
    return this.description;
  }

  /**
   * @returns Status
   */
  get Status() {
    return this.status;
  }
}
