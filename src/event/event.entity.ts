import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Province } from "src/province/province.entity";

/**
 * @class Event
 * @description Represents a event
 */
@Entity({ name: "events" })
export class Event extends Model {
  @Column({ unique: true })
  title: string = "";

  @Column()
  provinceId: number;

  @ManyToOne(() => Province, (province) => province.Events)
  province: Province;

  /**
   * @returns Title
   */
  get Title() {
    return this.title;
  }

  /**
   * @returns Province
   */
  get Province() {
    return this.province;
  }
}
