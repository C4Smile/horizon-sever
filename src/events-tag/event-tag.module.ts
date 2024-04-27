import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { EventTagController } from "./event-tag.controller";

// service
import { EventTagService } from "./event-tag.service";

// entities
import { EventTag } from "./event-tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventTag])],
  controllers: [EventTagController],
  providers: [EventTagService],
  exports: [EventTagService],
})
export class EventTagModule {}
