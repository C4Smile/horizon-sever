import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { CustomerModule } from "src/customer/customer.module";

// controller
import { ReservationController } from "./reservation.controller";

// service
import { ReservationService } from "./reservation.service";

// entity
import { Reservation } from "./reservation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), CustomerModule],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
