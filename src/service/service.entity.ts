import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";

/**
 * @class Service
 * @description Represents a country
 */
@Entity({ name: "services" })
export class Service extends Model {
  @Column({ type: "text", unique: true })
  name: string;

  @Column({ type: "text", unique: true })
  urlName: string;

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "int8" })
  imageId: number = 0;

  @OneToMany(() => Photo, (photo) => photo.Activities)
  image: Photo;
}
