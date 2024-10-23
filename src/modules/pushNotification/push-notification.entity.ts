import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { Photo } from "src/modules/image/image.entity";

/**
 * @class PushNotification
 * @description Represents a push notification
 */
@Entity({ name: "push-notification" })
export class PushNotification extends Model {
  @Column({ type: "text" })
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

  @ManyToOne(() => Photo)
  image: Photo;
}
