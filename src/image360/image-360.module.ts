import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ImageController } from "./image-360.controller";

// service
import { Image360Service } from "./image-360.service";

// entities
import { Photo360 } from "./image-360.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Photo360])],
  controllers: [ImageController],
  providers: [Image360Service],
  exports: [Image360Service],
})
export class ImageModule {}
