import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";
import { Photo360 } from "src/image360/image-360.entity";
import { RoomStatus } from "src/roomStatus/room-status.entity";
import { RoomType } from "src/roomType/room-type.entity";
import { RoomHasSchedule } from "src/roomHasSchedule/room-has-schedule.entity";

/**
 * @class Room
 * @description Represents a room
 */
@Entity({ name: "room" })
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

  @Column({ type: "int" })
  statusId: number;

  @Column({ type: "int" })
  typeId: number;

  //#region Relationships

  @ManyToOne(() => RoomStatus, (roomStatus) => roomStatus.Rooms, { cascade: true })
  status: RoomStatus;

  @ManyToOne(() => RoomType, (roomType) => roomType.Rooms, { cascade: true })
  type: RoomType;

  @OneToMany(() => RoomHasSchedule, (schedule) => schedule.Room, { cascade: true })
  roomHasSchedule: RoomHasSchedule[];

  @ManyToMany(() => Photo, (image) => image.Rooms)
  @JoinTable({
    name: "room-has-image",
    joinColumn: {
      name: "roomId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "roomHasImage",
    },
    inverseJoinColumn: {
      name: "imageId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "imageOfRoom",
    },
  })
  roomHasImage: Photo[];

  @ManyToMany(() => Photo360, (image360) => image360.Rooms)
  @JoinTable({
    name: "room-has-image360",
    joinColumn: {
      name: "roomId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "roomHasImage360",
    },
    inverseJoinColumn: {
      name: "image360Id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "image360OfRoom",
    },
  })
  roomHasImage360: Photo[];

  //#endregion
}
