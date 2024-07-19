import { Column, Entity, OneToMany, OneToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Photo } from "src/image/image.entity";
import { ServiceHasSchedule } from "src/serviceHasSchedule/service-has-schedule.entity";

/**
 * @class Service
 * @description Represents a service
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

  @Column({ type: "int" })
  imageId: number = 0;

  @OneToOne(() => Photo, (photo) => photo.service)
  image: Photo;

  @OneToMany(() => ServiceHasSchedule, (schedule) => schedule.Service, { cascade: true })
  serviceHasSchedule: ServiceHasSchedule[];
}
