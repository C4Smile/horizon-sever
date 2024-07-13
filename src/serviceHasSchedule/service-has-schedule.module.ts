import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ServiceHasScheduleController } from "./service-has-schedule.controller";

// service
import { ServiceHasScheduleService } from "./service-has-schedule.service";

// entities
import { ServiceHasSchedule } from "./service-has-schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ServiceHasSchedule])],
  controllers: [ServiceHasScheduleController],
  providers: [ServiceHasScheduleService],
  exports: [ServiceHasScheduleService],
})
export class ServiceHasScheduleModule {}
