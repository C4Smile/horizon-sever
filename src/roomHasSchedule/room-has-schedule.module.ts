import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { RoomHasScheduleController } from "./room-has-schedule.controller";

// service
import { RoomHasScheduleService } from "./room-has-schedule.service";

// entities
import { RoomHasSchedule } from "./room-has-schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomHasSchedule])],
  controllers: [RoomHasScheduleController],
  providers: [RoomHasScheduleService],
  exports: [RoomHasScheduleService],
})
export class RoomHasScheduleModule {}
