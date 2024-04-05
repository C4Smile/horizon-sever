import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Country } from "src/country/country.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { Invoice } from "src/invoice/invoice.entity";

/**
 * @class Customer
 * @description Represents a customer
 */
@Entity({ name: "customer" })
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

  @Column()
  countryId: number;

  @ManyToOne(() => Country, (country) => country.Customers)
  country: Country;

  @OneToMany(() => Reservation, (reservation) => reservation.Customer)
  reservations: Reservation[];

  @OneToMany(() => Invoice, (invoice) => invoice.Customer)
  invoices: Invoice[];

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

  /**
   * @returns Invoices
   */
  get Invoices() {
    return this.invoices;
  }
}
