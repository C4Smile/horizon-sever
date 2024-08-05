import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
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

  @Column({
    type: "datetime",
  })
  date: Date = null;

  @ManyToMany(() => Photo, (photo) => photo.guestBooks)
  @JoinTable({
    name: "guest-has-image",
    joinColumn: {
      name: "guestBookId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "guestBookHasImage",
    },
    inverseJoinColumn: {
      name: "imageId",
      referencedColumnName: "id",
      foreignKeyConstraintName: "imageOfGuestBook",
    },
  })
  guestBookHasImage: Photo[];
}
