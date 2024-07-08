import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { EventHasLinkController } from "./event-has-link.controller";

// service
import { EventHasLinkService } from "./event-has-link.service";

// entities
import { EventHasLink } from "./event-has-link.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventHasLink])],
  controllers: [EventHasLinkController],
  providers: [EventHasLinkService],
  exports: [EventHasLinkService],
})
export class EventHasLinkModule {}
