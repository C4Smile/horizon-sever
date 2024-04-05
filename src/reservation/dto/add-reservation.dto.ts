// dto
import { AddModelDto } from "src/models/add-model.dto";
import { ReservationStatus } from "../reservation.entity";

export interface AddReservationDto extends AddModelDto {
  customerId: number;
  checkInDate: Date;
  checkOutDate: Date;
  status: ReservationStatus;
  ticket: string;
}
