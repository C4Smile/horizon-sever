import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { GuestBookHasImageController } from "./guest-book-has-image.controller";

// service
import { GuestBookHasImageService } from "./guest-book-has-image.service";

// entity
import { GuestBookHasImage } from "./guest-book-has-image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GuestBookHasImage])],
  controllers: [GuestBookHasImageController],
  providers: [GuestBookHasImageService],
  exports: [GuestBookHasImageService],
})
export class GuestBookHasImageModule {}
