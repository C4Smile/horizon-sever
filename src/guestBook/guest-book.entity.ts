import { Column, Entity, ManyToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";

/**
 * @class GuestBook
 * @description Represents a service
 */
@Entity({ name: "guest-book" })
export class GuestBook extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  name: string;

  @AutoMap()
  @Column({ type: "text", unique: true })
  urlName: string;

  @AutoMap()
  @Column({ type: "text" })
  description: string = "";

  @AutoMap()
  @Column({ type: "text" })
  content: string = "";

  @ManyToMany(() => Photo)
  guestBookHasImage: Photo[];
}
