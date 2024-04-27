import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { EventController } from "./event.controller";

// service
import { EventService } from "./event.service";

// entities
import { Event } from "./event.entity";
import { ProvinceModule } from "src/province/province.module";
import { EventTagModule } from "src/events-tag/event-tag.module";

@Module({
  imports: [TypeOrmModule.forFeature([Event]), ProvinceModule, EventTagModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
