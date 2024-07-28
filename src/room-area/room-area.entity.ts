import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Room } from "src/room/room.entity";
import { Photo } from "src/image/image.entity";
import { Photo360 } from "src/image360/image-360.entity";
import { RoomStatus } from "src/roomStatus/room-status.entity";

/**
 * @class RoomArea
 * @description Represents an area of a room
 */
@Entity({ name: "room-area" })
export class RoomArea extends Model {
  @AutoMap()
  @Column({ type: "int" })
  number: number = 0;

  @AutoMap()
  @Column({ type: "text" })
  name: string = "";

  @AutoMap()
  @Column({ type: "text" })
  description: string = "";

  @AutoMap()
  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "int" })
  roomId: number;

  @Column({ type: "int" })
  statusId: number;

  //#region Relationships

  @AutoMap()
  @ManyToOne(() => RoomStatus, (roomStatus) => roomStatus.RoomAreas, { cascade: true })
  status: RoomStatus;

  @AutoMap()
  @ManyToOne(() => Room, (room) => room.roomAreas, { cascade: true })
  room: Room;

  @ManyToMany(() => Photo, (image) => image.RoomAreas)
  @JoinTable({
    name: "room-area-has-image",
    joinColumn: {
      name: "roomAreaId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "roomAreaHasImage",
    },
    inverseJoinColumn: {
      name: "imageId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "imageOfRoomArea",
    },
  })
  roomAreaHasImage: Photo[];

  @ManyToMany(() => Photo360, (image360) => image360.RoomAreas)
  @JoinTable({
    name: "room-area-has-image360",
    joinColumn: {
      name: "roomAreaId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "roomAreaHasImage360",
    },
    inverseJoinColumn: {
      name: "image360Id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "image360OfRoomArea",
    },
  })
  roomAreaHasImage360: Photo[];
}
