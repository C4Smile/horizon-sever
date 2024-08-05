import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { EventController } from "./event.controller";
import { EventHasTagController } from "./event-has-tags.controller";

// service
import { EventService } from "./event.service";
import { EventHasTagService } from "./event-has-tag.service";

// module
import { TagModule } from "src/tags/tag.module";

// entities
import { Event } from "./event.entity";
import { EventHasTag } from "./event-has-tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventHasTag]), TagModule],
  controllers: [EventController, EventHasTagController],
  providers: [EventService, EventHasTagService],
  exports: [EventService, EventHasTagService],
})
export class EventModule {}
