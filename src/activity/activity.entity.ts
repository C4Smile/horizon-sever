import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";

/**
 * @class Activity
 * @description Represents a country
 */
@Entity({ name: "activities" })
export class Activity extends Model {
  @Column({ type: "text", unique: true })
  title: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "text" })
  entity: string = "";

  @Column({ type: "int8" })
  imageId: number = 0;

  @OneToMany(() => Photo, (photo) => photo.Activities)
  image: Photo;
}
