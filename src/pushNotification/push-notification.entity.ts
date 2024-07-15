import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";

/**
 * @class PushNotification
 * @description Represents a push notification
 */
@Entity({ name: "pushNotification" })
export class PushNotification extends Model {
  @Column({ type: "text", unique: true })
  title: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "text" })
  action: string = "";

  @Column({ type: "int8" })
  imageId: number = 0;

  @Column({
    nullable: true,
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  sentDate: Date = null;

  @OneToMany(() => Photo, (photo) => photo.Activities)
  image: Photo;
}
