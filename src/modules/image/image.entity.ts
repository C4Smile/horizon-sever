import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

// entities
import { Model } from "src/modules/models/model";
import { PushNotification } from "../pushNotification/push-notification.entity";

@Entity({ name: "images" })
export class Photo extends Model {
  @Column({ type: "text" })
  fileName: string;

  @Column({ type: "text" })
  alt: string;

  @Column({ type: "text" })
  url: string;

  @OneToMany(() => PushNotification, (pushNotification) => pushNotification.image, { cascade: true })
  pushNotifications: PushNotification;
}
