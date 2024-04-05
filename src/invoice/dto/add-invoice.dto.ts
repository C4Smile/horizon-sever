// dto
import { AddModelDto } from "src/models/add-model.dto";

export interface AddInvoiceDto extends AddModelDto {
  dateIssued?: Date;
  totalAmount: number;
  reservationId: number;
  customerId: number;
  currencyId: number;
  paymentMethodId: number;
}
