import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

// dto
import { ReservationDto } from "./dto/reservation.dto";
import { AddReservationDto } from "./dto/add-reservation.dto";

// services
import { ReservationService } from "./reservation.service";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("reservation")
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<ReservationDto[]> {
    return this.reservationService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.reservationService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newReservation: AddReservationDto) {
    return this.reservationService.create(newReservation);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.reservationService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateReservationDto) {
    return this.reservationService.update(id, data);
  }
}
