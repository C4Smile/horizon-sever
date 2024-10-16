import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { RoomHasImageController } from "./room-has-image.controller";

// service
import { RoomHasImageService } from "./room-has-image.service";

// entity
import { Photo } from "src/image/image.entity";
import { RoomHasImage } from "./room-has-image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomHasImage, Photo])],
  controllers: [RoomHasImageController],
  providers: [RoomHasImageService],
  exports: [RoomHasImageService],
})
export class RoomHasImageModule {}
