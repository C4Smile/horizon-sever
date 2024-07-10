import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { EventController } from "./event.controller";

// service
import { EventService } from "./event.service";

// module
import { TagModule } from "src/tags/tag.module";

// entities
import { Event } from "./event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event]), TagModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
