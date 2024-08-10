import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";
import { AutoMap } from "@automapper/classes";

/**
 * @class PushNotification
 * @description Represents a push notification
 */
@Entity({ name: "push-notification" })
export class PushNotification extends Model {
  @AutoMap()
  @Column({ type: "text", unique: true })
  title: string = "";

  @AutoMap()
  @Column({ type: "text" })
  description: string = "";

  @AutoMap()
  @Column({ type: "text" })
  action: string = "";

  @Column({ type: "int" })
  imageId: number = 0;

  @AutoMap()
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
