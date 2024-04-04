import { Model } from "src/models/model";
import { Column, Entity } from "typeorm";

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

  @Column({ type: "datetime" })
  checkInDate: Date;

  @Column({ type: "datetime" })
  checkOutDate: Date;

  @Column({ type: "string", default: () => ReservationStatus.pending })
  status: ReservationStatus = ReservationStatus.pending;

  @Column({ type: "string", unique: true })
  ticket: string = "";

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
    customerId: number,
    checkInDate: Date,
    checkOutDate: Date,
    status: ReservationStatus,
    ticket: string,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.customerId = customerId;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.status = status;
    this.ticket = ticket;
  }

  /**
   * @returns Customer
   */
  get CustomerId() {
    return this.customerId;
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
}
