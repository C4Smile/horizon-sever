import { Column, Entity, OneToMany } from "typeorm";

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
  @Column({ nullable: true, type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  dateIssued: Date = null;

  @Column()
  totalAmount: number = 0;

  @OneToMany(() => Reservation, (reservation) => reservation.Invoices)
  reservation = null;

  @OneToMany(() => Customer, (customer) => customer.Invoices)
  customer = null;

  @OneToMany(() => Currency, (currency) => currency.Invoices)
  currency = null;

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.Invoices)
  paymentMethod = null;

  /**
   * @param {number} id - Invoice id
   * @param {Reservation} reservation - Invoice reservation
   * @param {Customer} customer - Invoice customer
   * @param {Currency} currency - Invoice currency
   * @param {PaymentMethod} paymentMethod - Invoice payment method
   * @param {Date} dateIssued - Invoice date issued
   * @param {number} totalAmount - Invoice total amount
   * @param {Date} dateOfCreation - Invoice date of creation
   * @param {Date} lastUpdate - Invoice last update
   * @param {boolean} deleted - Invoice deleted
   */
  constructor(
    id: number,
    reservation: Reservation,
    customer: Customer,
    currency: Currency,
    paymentMethod: PaymentMethod,
    totalAmount: number,
    dateIssued: Date = null,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.reservation = reservation;
    this.customer = customer;
    this.currency = currency;
    this.paymentMethod = paymentMethod;
    this.dateIssued = dateIssued;
    this.totalAmount = totalAmount;
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
