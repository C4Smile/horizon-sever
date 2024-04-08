import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// service
import { CustomerService } from "src/customer/customer.service";

// entity
import { Reservation } from "./reservation.entity";

// dto
import { AddReservationDto } from "./dto/add-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private reservationService: Repository<Reservation>,
    private customersService: CustomerService,
  ) {}

  async create(reservation: AddReservationDto) {
    const countryFound = await this.customersService.getById(reservation.customerId);

    if (!countryFound) {
      return new HttpException("Country not Found", HttpStatus.NOT_FOUND);
    }

    const newReservation = this.reservationService.create(reservation);
    return this.reservationService.save(newReservation);
  }

  get() {
    return this.reservationService.find({ relations: ["customer"] });
  }

  async getById(id: number) {
    const reservationFound = await this.reservationService.findOne({
      where: {
        id,
      },
    });

    if (!reservationFound) {
      return new HttpException("Reservation not Found", HttpStatus.NOT_FOUND);
    }

    return reservationFound;
  }

  async remove(id: number) {
    const result = await this.reservationService.delete({ id });
    if (result.affected === 0) {
      return;
    }

    return result;
  }

  async update(id: number, data: UpdateReservationDto) {
    const reservationFound = await this.reservationService.findOne({
      where: {
        id,
      },
    });

    if (!reservationFound) {
      return new HttpException("Reservation not Found", HttpStatus.NOT_FOUND);
    }

    const updatedReservation = Object.assign(reservationFound, data);

    return this.reservationService.save(updatedReservation);
  }
}
