import { Column, Entity, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { Room } from "src/room/room.entity";
import { RoomArea } from "src/roomArea/room-area.entity";

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

  @OneToMany(() => RoomArea, (roomArea) => roomArea.status)
  roomAreas: RoomArea[];

  /**
   * @returns Rooms
   */
  get Rooms() {
    return this.rooms;
  }

  /**
   * @returns RoomAreas
   */
  get RoomAreas() {
    return this.roomAreas;
  }
}
