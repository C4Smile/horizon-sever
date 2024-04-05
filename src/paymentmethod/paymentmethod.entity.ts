import { Column, Entity, ManyToOne } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Invoice } from "src/invoice/invoice.entity";

/**
 * @class PaymentMethod
 * @description Represents a paymentMethod
 */
@Entity({ name: "paymentmethods" })
export class PaymentMethod extends Model {
  @Column({ unique: true })
  name: string = "";

  @ManyToOne(() => Invoice, (invoice) => invoice.PaymentMethod)
  invoices: Invoice[];

  /**
   * @param {number} id - PaymentMethod id
   * @param {string} name - PaymentMethod name
   * @param {Date} dateOfCreation - PaymentMethod date of creation
   * @param {Date} lastUpdate - PaymentMethod last update
   * @param {boolean} deleted - PaymentMethod deleted
   * @returns PaymentMethod instance
   */
  constructor(
    id: number,
    name: string,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.name = name;
  }

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns Invoices
   */
  get Invoices() {
    return this.invoices;
  }
}
