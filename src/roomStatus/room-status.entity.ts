import { Column, Entity, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { Room } from "src/room/room.entity";

/**
 * @class RoomStatus
 * @description Represents a room status
 */
@Entity({ name: "room-status" })
export class RoomStatus extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string = "";

  @OneToMany(() => Room, (room) => room.status)
  rooms: Room[];

  /**
   * @returns Rooms
   */
  get Rooms() {
    return this.rooms;
  }
}
