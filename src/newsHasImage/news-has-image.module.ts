import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { EventHasImageController } from "./news-has-image.controller";

// service
import { EventHasImageService } from "./news-has-image.service";

// entities
import { EventHasImage } from "./event-has-image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventHasImage])],
  controllers: [EventHasImageController],
  providers: [EventHasImageService],
  exports: [EventHasImageService],
})
export class EventHasImageModule {}
