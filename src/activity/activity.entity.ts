import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";

/**
 * @class Activity
 * @description Represents a activity
 */
@Entity({ name: "activity" })
export class Activity extends Model {
  @Column({ type: "text", unique: true })
  title: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "text" })
  entity: string = "";

  @Column({ type: "int" })
  imageId: number = 0;

  @ManyToOne(() => Photo)
  image: Photo;
}
