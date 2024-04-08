import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Currency } from "src/currency/currency.entity";
import { Customer } from "src/customer/customer.entity";
import { Reservation } from "src/reservation/reservation.entity";
import { PaymentMethod } from "src/paymentmethod/paymentmethod.entity";

/**
 * @class Invoice
 * @description Represents an invoice
 */
@Entity({ name: "invoices" })
export class Invoice extends Model {
  @Column({ unique: true })
  ticket: string;

  @Column({ nullable: true, type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  dateIssued: Date = null;

  @Column()
  totalAmount: number = 0;

  @Column()
  reservationId: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.Invoices)
  reservation: Reservation;

  @Column()
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.Invoices)
  customer: Customer;

  @Column()
  currencyId: number;

  @ManyToOne(() => Currency, (currency) => currency.Invoices)
  currency: Currency;

  @Column()
  paymentMethodId: number;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.Invoices)
  paymentMethod: PaymentMethod;

  /**
   * @returns Ticket
   */
  get Ticket() {
    return this.ticket;
  }

  /**
   * @returns Reservation
   */
  get Reservation() {
    return this.reservation;
  }

  /**
   * @returns Customer
   */
  get Customer() {
    return this.customer;
  }

  /**
   * @returns Currency
   */
  get Currency() {
    return this.currency;
  }

  /**
   * @returns PaymentMethod
   */
  get PaymentMethod() {
    return this.paymentMethod;
  }

  /**
   * @returns DateIssued
   */
  get DateIssued() {
    return this.dateIssued;
  }

  /**
   * @returns TotalAmount
   */
  get TotalAmount() {
    return this.totalAmount;
  }
}
