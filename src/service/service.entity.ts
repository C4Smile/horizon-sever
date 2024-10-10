import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

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
  @AutoMap()
  @Column({ type: "text",  })
  name: string;

  @AutoMap()
  @Column({ type: "text",  })
  urlName: string;

  @AutoMap()
  @Column({ type: "text" })
  description: string = "";

  @AutoMap()
  @Column({ type: "text" })
  content: string = "";

  @Column({ type: "int" })
  imageId: number = 0;

  @ManyToOne(() => Photo)
  image: Photo;

  @OneToMany(() => ServiceHasSchedule, (schedule) => schedule.Service, { cascade: true })
  serviceHasSchedule: ServiceHasSchedule[];
}
