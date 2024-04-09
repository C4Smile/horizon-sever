// dto
import { ModelDto } from "src/models/model.dto";
import { CurrencyDto } from "src/currency/dto/currency.dto";
import { CustomerDto } from "src/customer/dto/customer.dto";
import { PaymentMethodDto } from "src/payment-method/dto/payment-method.dto";
import { ReservationDto } from "src/reservation/dto/reservation.dto";

export interface InvoiceDto extends ModelDto {
  ticket: string;
  dateIssued: Date;
  totalAmount: number;
  reservation: ReservationDto;
  customer: CustomerDto;
  currency: CurrencyDto;
  paymentMethod: PaymentMethodDto;
}
