import { Model } from "src/models/model";
import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Service } from "src/service/service.entity";

/**
 * @class ServiceHasSchedule
 * @description Represents the relationship between services and external link
 */
@Entity({ name: "serviceHasSchedule" })
export class ServiceHasSchedule extends Model {
  @Column({ type: "int" })
  serviceId: number = 0;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date = new Date();

  @ManyToOne(() => Service, (service) => service.serviceHasSchedule)
  service: Service;

  get Service() {
    return this.service;
  }
}
