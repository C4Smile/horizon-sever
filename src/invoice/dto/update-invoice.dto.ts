// dto
import { UpdateModelDto } from "src/models/update-model.dto";

export interface UpdateInvoiceDto extends UpdateModelDto {
  dateIssued?: Date;
  totalAmount?: number;
  reservationId?: number;
  customerId?: number;
  currencyId?: number;
  paymentMethodId?: number;
}
