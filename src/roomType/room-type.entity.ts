import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Room } from "src/room/room.entity";

/**
 * @class RoomType
 * @description Represents a country
 */
@Entity({ name: "roomType" })
export class RoomType extends Model {
  @Column({ type: "text", unique: true })
  name: string = "";

  @ManyToOne(() => Room, (room) => room.roomType)
  rooms: Room[];

  /**
   * @returns Rooms
   */
  get Rooms() {
    return this.rooms;
  }
}
