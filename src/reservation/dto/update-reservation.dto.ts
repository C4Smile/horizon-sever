// dto
import { UpdateModelDto } from "src/models/update-model.dto";
import { ReservationStatus } from "../reservation.entity";

export interface UpdateReservationDto extends UpdateModelDto {
  customerId?: number;
  checkInDate?: Date;
  checkOutDate?: Date;
  status?: ReservationStatus;
  ticket?: string;
}
