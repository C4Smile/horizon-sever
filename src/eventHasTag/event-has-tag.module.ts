import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { EventHasTagController } from "./event-has-tag.controller";

// service
import { EventHasTagService } from "./event-has-tag.service";

// entities
import { EventHasTag } from "./event-has-tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventHasTag])],
  controllers: [EventHasTagController],
  providers: [EventHasTagService],
  exports: [EventHasTagService],
})
export class EventHasTagModule {}
