import { Column, Entity, ManyToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Room } from "src/room/room.entity";
import { RoomArea } from "src/roomArea/room-area.entity";

@Entity({ name: "images360" })
export class Photo360 extends Model {
  @Column({ type: "text", unique: true })
  fileName: string;

  @Column({ type: "text", unique: true })
  url: string;

  @ManyToMany(() => Room, (room) => room.roomHasImage360, { cascade: true })
  rooms: Room[];

  @ManyToMany(() => RoomArea, (roomArea) => roomArea.roomAreaHasImage, { cascade: true })
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
