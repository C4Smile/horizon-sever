import { Column, Entity, ManyToOne } from "typeorm";

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

  @ManyToOne(() => Invoice, (invoice) => invoice.Currency)
  invoices: Invoice[];

  /**
   * @param {number} id - Currency id
   * @param {string} name - Currency name
   * @param {string} reduction - Currency reduction
   * @param {Date} dateOfCreation - Currency date of creation
   * @param {Date} lastUpdate - Currency last update
   * @param {boolean} deleted - Currency deleted
   * @returns Currency instance
   */
  constructor(
    id: number,
    name: string,
    reduction: string,
    dateOfCreation: Date = null,
    lastUpdate: Date = null,
    deleted: boolean = false,
  ) {
    super(id, dateOfCreation, lastUpdate, deleted);
    this.name = name;
    this.reduction = reduction;
  }

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
