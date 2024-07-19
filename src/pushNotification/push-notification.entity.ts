import { Column, Entity, OneToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";

/**
 * @class PushNotification
 * @description Represents a push notification
 */
@Entity({ name: "push-notification" })
export class PushNotification extends Model {
  @Column({ type: "text", unique: true })
  title: string = "";

  @Column({ type: "text" })
  description: string = "";

  @Column({ type: "text" })
  action: string = "";

  @Column({ type: "int" })
  imageId: number = 0;

  @Column({
    nullable: true,
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  sentDate: Date = null;

  @OneToOne(() => Photo, (photo) => photo.pushNotification)
  image: Photo;
}
