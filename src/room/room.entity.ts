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
  @Column({ type: "text", unique: true })
  number: string = "";

  @Column({ type: "text", unique: true })
  name: string = "";

  @Column({ type: "text", unique: true })
  urlName: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "int8" })
  status: RoomStatus = RoomStatus.operational;
}
