import { Column, Entity, ManyToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";

/**
 * @class GuestBook
 * @description Represents a service
 */
@Entity({ name: "services" })
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

  @Column({ type: "int" })
  imageId: number = 0;

  @ManyToMany(() => Photo)
  guestBookHasImage: Photo[];
}
