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

  @Column()
  countryId: number;

  @ManyToOne(() => Country, (country) => country.Provinces)
  country: Country;

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
