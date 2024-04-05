import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Country } from "src/country/country.entity";

/**
 * @class Province
 * @description Represents a province
 */
@Entity({ name: "provinces" })
export class Province extends Model {
  @Column({ unique: true })
  name: string = "";

  @ManyToOne(() => Country, (country) => country.Provinces)
  country: Country;

  /**
   * @param {number} id - Province id
   * @param {string} name - Province name
   * @param {Country} country - Province country
   * @param {Date} dateOfCreation - Province date of creation
   * @param {Date} lastUpdate - Province last update
   * @param {boolean} deleted - Province deleted
   */
  constructor(
    id: number,
    name: string,
    country: Country,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.name = name;
    this.country = country;
  }

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
}
