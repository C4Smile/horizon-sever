import { Column, Entity, ManyToMany } from "typeorm";

// entities
import { Model } from "src/models/model";

@Entity({ name: "image360" })
export class Photo360 extends Model {
  @Column({ type: "text", unique: true })
  fileName: string;

  @Column({ type: "text", unique: true })
  url: string;

  @ManyToMany(() => Room, (room) => room.roomHasImage360, { cascade: true })
  rooms: Room[];

  /**
   * @returns Roms
   */
  get Roms() {
    return this.rooms;
  }
}
