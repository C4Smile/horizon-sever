import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Customer } from "src/customer/customer.entity";
import { Province } from "src/province/province.entity";

/**
 * @class Country
 * @description Represents a country
 */
@Entity({ name: "countries" })
export class Country extends Model {
  @Column({ unique: true })
  name: string = "";

  @Column({ unique: true })
  iso: string = "";

  @OneToMany(() => Customer, (customer) => customer.Country)
  customers: Customer[];

  @OneToMany(() => Province, (province) => province.Country)
  provinces: Province[];

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns ISO
   */
  get Iso() {
    return this.iso;
  }

  /**
   * @returns Customers
   */
  get Customers() {
    return this.customers;
  }

  /**
   * @returns Provinces
   */
  get Provinces() {
    return this.provinces;
  }
}
