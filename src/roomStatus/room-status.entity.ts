import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Room } from "src/room/room.entity";

/**
 * @class RoomStatus
 * @description Represents a room status
 */
@Entity({ name: "roomStatus" })
export class RoomStatus extends Model {
  @Column({ type: "text", unique: true })
  name: string = "";

  @ManyToOne(() => Room, (room) => room.roomStatus)
  rooms: Room[];

  /**
   * @returns Rooms
   */
  get Rooms() {
    return this.rooms;
  }
}
