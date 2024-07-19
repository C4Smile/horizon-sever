import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Room } from "src/room/room.entity";

/**
 * @class RoomType
 * @description Represents a room type
 */
@Entity({ name: "room-type" })
export class RoomType extends Model {
  @Column({ type: "text", unique: true })
  name: string = "";

  @OneToMany(() => Room, (room) => room.type)
  rooms: Room[];

  /**
   * @returns Rooms
   */
  get Rooms() {
    return this.rooms;
  }
}
