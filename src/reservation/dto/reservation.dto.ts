// dto
import { ModelDto } from "src/models/model.dto";
import { ReservationStatus } from "../reservation.entity";
import { CustomerDto } from "src/customer/dto/customer.dto";

export interface ReservationDto extends ModelDto {
  customer: CustomerDto;
  checkInDate: Date;
  checkOutDate: Date;
  status: ReservationStatus;
  ticket: string;
}
