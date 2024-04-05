import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Customer } from "src/customer/customer.entity";

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

  /**
   * @param {number} id - Country id
   * @param {string} name - Country name
   * @param {string} iso - Country iso
   * @param {Date} dateOfCreation - Country date of creation
   * @param {Date} lastUpdate - Country last update
   * @param {boolean} deleted - Country deleted
   */
  constructor(
    id: number,
    name: string,
    iso: string,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.name = name;
    this.iso = iso;
  }

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
}
