import { Column, Entity, OneToMany } from "typeorm";

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

  @OneToMany(() => Invoice, (invoice) => invoice.PaymentMethod)
  invoices: Invoice[];

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
