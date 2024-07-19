import { Model } from "src/models/model";
import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Room } from "src/room/room.entity";

/**
 * @class RoomHasSchedule
 * @description Represents the relationship between rooms and external link
 */
@Entity({ name: "roomHasSchedule" })
export class RoomHasSchedule extends Model {
  @Column({ type: "int" })
  roomId: number = 0;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date = new Date();

  @ManyToOne(() => Room, (room) => room.roomHasSchedule)
  room: Room;

  get Room() {
    return this.room;
  }
}
