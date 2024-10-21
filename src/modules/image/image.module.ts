import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ImageController } from "./image.controller";

// service
import { ImageService } from "./image.service";

// entities
import { Photo } from "./image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
