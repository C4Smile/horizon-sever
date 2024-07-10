import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { EventHasScheduleController } from "./event-has-schedule.controller";

// service
import { EventHasScheduleService } from "./event-has-schdule.service";

// entities
import { EventHasSchedule } from "./event-has-schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventHasSchedule])],
  controllers: [EventHasScheduleController],
  providers: [EventHasScheduleService],
  exports: [EventHasScheduleService],
})
export class EventHasScheduleModule {}
