import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { RoomAreaHasImageController } from "./room-area-has-image.controller";

// service
import { RoomAreaHasImageService } from "./room-area-has-image.service";

// entity
import { RoomAreaHasImage } from "./room-area-has-image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomAreaHasImage])],
  controllers: [RoomAreaHasImageController],
  providers: [RoomAreaHasImageService],
  exports: [RoomAreaHasImageService],
})
export class RoomAreaHasImageModule {}
