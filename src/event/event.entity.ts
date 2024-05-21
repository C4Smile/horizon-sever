import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Province } from "src/province/province.entity";
import { Tag } from "src/tags/tag.entity";

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

  @ManyToMany(() => Tag, (tag) => tag.Events)
  tags: Tag[];

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

  /**
   * @returns EventTags
   */
  get Tags() {
    return this.tags;
  }
}
