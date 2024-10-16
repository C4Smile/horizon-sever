import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { NewsHasImageController } from "./news-has-image.controller";

// service
import { NewsHasImageService } from "./news-has-image.service";

// entity
import { Photo } from "src/image/image.entity";
import { NewsHasImage } from "./news-has-image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NewsHasImage, Photo])],
  controllers: [NewsHasImageController],
  providers: [NewsHasImageService],
  exports: [NewsHasImageService],
})
export class NewsHasImageModule {}
