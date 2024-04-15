import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Customer } from "src/customer/customer.entity";
import { Invoice } from "src/invoice/invoice.entity";

export enum ReservationStatus {
  pending = "pending",
  confirmed = "confirmed",
  cancelled = "cancelled",
}

/**
 * @class Reservation
 * @description Represents a reservation
 */
@Entity({ name: "reservations" })
export class Reservation extends Model {
  @Column()
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.Reservations)
  customer: Customer;

  @Column({ type: "datetime" })
  checkInDate: Date;

  @Column({ type: "datetime" })
  checkOutDate: Date;

  @Column()
  status: ReservationStatus = ReservationStatus.pending;

  @Column({ unique: true })
  ticket: string = "";

  @OneToMany(() => Invoice, (invoice) => invoice.Reservation)
  invoices: Invoice[];

  /**
   * @returns Customer
   */
  get Customer() {
    return this.customer;
  }

  /**
   * @returns CheckInDate
   */
  get CheckInDate() {
    return this.checkInDate;
  }

  /**
   * @returns CheckOutDate
   */
  get CheckOutDate() {
    return this.checkOutDate;
  }

  /**
   * @returns Status
   */
  get Status() {
    return this.status;
  }

  /**
   * @returns Ticket
   */
  get Ticket() {
    return this.ticket;
  }

  /**
   * @returns Invoices
   */
  get Invoices() {
    return this.invoices;
  }
}
