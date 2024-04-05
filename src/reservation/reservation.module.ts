import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ReservationController } from "./reservation.controller";

// service
import { ReservationService } from "./reservation.service";

// entity
import { Reservation } from "./reservation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
