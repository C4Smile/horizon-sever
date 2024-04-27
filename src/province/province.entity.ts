import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Event } from "src/event/event.entity";
import { Country } from "src/country/country.entity";
import { News } from "src/news/news.entity";

/**
 * @class Province
 * @description Represents a province
 */
@Entity({ name: "provinces" })
export class Province extends Model {
  @Column({ unique: true })
  name: string = "";

  @Column()
  countryId: number;

  @ManyToOne(() => Country, (country) => country.Provinces)
  country: Country;

  @OneToMany(() => Event, (event) => event.Province)
  events: Event[];

  @OneToMany(() => News, (news) => news.Province)
  news: News[];

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns Country
   */
  get Country() {
    return this.country;
  }

  /**
   * @returns Events
   */
  get Events() {
    return this.events;
  }

  /**
   * @returns News
   */
  get News() {
    return this.news;
  }
}
