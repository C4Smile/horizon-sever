import { Column, Entity, OneToMany } from "typeorm";

// entities
import { Model } from "src/models/model";
import { Invoice } from "src/invoice/invoice.entity";

/**
 * @class Currency
 * @description Represents a currency
 */
@Entity({ name: "currencies" })
export class Currency extends Model {
  @Column({ unique: true })
  name: string = "";

  @Column({ unique: true })
  reduction: string = "";

  @OneToMany(() => Invoice, (invoice) => invoice.Currency)
  invoices: Invoice[];

  /**
   * @returns Name
   */
  get Name() {
    return this.name;
  }

  /**
   * @returns Reduction
   */
  get Reduction() {
    return this.reduction;
  }

  /**
   * @returns Invoices
   */
  get Invoices() {
    return this.Invoices;
  }
}
