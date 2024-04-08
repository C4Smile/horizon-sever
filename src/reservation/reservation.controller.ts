import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { ReservationDto } from "./dto/reservation.dto";
import { AddReservationDto } from "./dto/add-reservation.dto";

// services
import { ReservationService } from "./reservation.service";
import { UpdateReservationDto } from "./dto/update-reservation.dto";

@Controller("reservation")
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Get()
  get(): Promise<ReservationDto[]> {
    return this.reservationService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.reservationService.getById(id);
  }

  @Post()
  create(@Body() newReservation: AddReservationDto) {
    return this.reservationService.create(newReservation);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.reservationService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateReservationDto) {
    return this.update(id, data);
  }
}
