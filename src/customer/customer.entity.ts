import { Column, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Country } from "src/country/country.entity";
import { Reservation } from "src/reservation/reservation.entity";

/**
 * @class Customer
 * @description Represents a customer
 */
export class Customer extends Model {
  @Column()
  name: string = "";

  @Column({ unique: true })
  email: string = "";

  @Column({ unique: true })
  phone: string = "";

  @Column()
  address: string = "";

  @Column({ unique: true })
  identification: string = "";

  @ManyToOne(() => Country, (country) => country.Customers)
  country: Country;

  @ManyToOne(() => Reservation, (reservation) => reservation.Customer)
  reservations: Reservation[];

  /**
   * @param {number} id - Customer id
   * @param {string} name - Customer name
   * @param {string} email - Customer email
   * @param {string} phone - Customer phone
   * @param {string} address - Customer address
   * @param {string} identification - Customer identification
   * @param {Country} country - Customer country
   * @param {Date} dateOfCreation - Customer date of creation
   * @param {Date} lastUpdate - Customer last update
   * @param {boolean} deleted - Customer deleted
   */
  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    identification: string,
    country: Country,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.country = country;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.identification = identification;
  }

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns Email
   */
  get Email() {
    return this.email;
  }

  /**
   * @returns Phone
   */
  get Phone() {
    return this.phone;
  }

  /**
   * @returns Address
   */
  get Address() {
    return this.address;
  }

  /**
   * @returns Identification
   */
  get Identification() {
    return this.identification;
  }

  /**
   * @returns Country
   */
  get Country() {
    return this.country;
  }

  /**
   * @returns Reservations
   */
  get Reservations() {
    return this.reservations;
  }
}
