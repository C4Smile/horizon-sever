import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";
import { Photo360 } from "src/image360/image-360.entity";
import { RoomStatus } from "src/roomStatus/room-status.entity";
import { RoomType } from "src/roomType/room-type.entity";
import { RoomHasSchedule } from "src/roomHasSchedule/room-has-schedule.entity";
import { RoomArea } from "src/roomArea/room-area.entity";

/**
 * @class Room
 * @description Represents a room
 */
@Entity({ name: "room" })
export class Room extends Model {
  @AutoMap()
  @Column({ type: "text" })
  number: string = "";

  @AutoMap()
  @Column({ type: "text",  })
  name: string = "";

  @AutoMap()
  @Column({ type: "text" })
  urlName: string = "";

  @AutoMap()
  @Column({ type: "text" })
  description: string = "";

  @AutoMap()
  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "int" })
  statusId: number;

  @Column({ type: "int" })
  typeId: number;

  //#region Relationships

  @AutoMap()
  @ManyToOne(() => RoomStatus, (roomStatus) => roomStatus.Rooms, { cascade: true })
  status: RoomStatus;

  @AutoMap()
  @ManyToOne(() => RoomType, (roomType) => roomType.Rooms, { cascade: true })
  type: RoomType;

  @OneToMany(() => RoomHasSchedule, (schedule) => schedule.Room, { cascade: true })
  roomHasSchedule: RoomHasSchedule[];

  @AutoMap()
  @OneToMany(() => RoomArea, (roomArea) => roomArea.room)
  roomAreas: RoomArea[];

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
