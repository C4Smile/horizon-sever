import { Column, Entity, ManyToOne } from "typeorm";

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
  @ManyToOne(() => Customer, (customer) => customer.Reservations)
  customer: Customer;

  @Column({ type: "datetime" })
  checkInDate: Date;

  @Column({ type: "datetime" })
  checkOutDate: Date;

  @Column({ type: "string", default: () => ReservationStatus.pending })
  status: ReservationStatus = ReservationStatus.pending;

  @Column({ type: "string", unique: true })
  ticket: string = "";

  @ManyToOne(() => Invoice, (invoice) => invoice.Reservation)
  invoices: Invoice[];

  /**
   * @param {number} id - Reservation id
   * @param {Customer} customer - Reservation customer
   * @param {Date} checkInDate - Reservation check-in date
   * @param {Date} checkOutDate - Reservation check-out date
   * @param {ReservationStatus} status - Reservation status
   * @param {string} ticket - Reservation ticket
   * @param {Date} dateOfCreation - Reservation date of creation
   * @param {Date} lastUpdate - Reservation last update
   * @param {boolean} deleted - Reservation deleted
   * @returns Reservation instance
   */
  constructor(
    id: number,
    customer: Customer,
    checkInDate: Date,
    checkOutDate: Date,
    status: ReservationStatus,
    ticket: string,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.customer = customer;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.status = status;
    this.ticket = ticket;
  }

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
