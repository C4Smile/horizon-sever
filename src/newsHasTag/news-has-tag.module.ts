import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { NewsHasTagController } from "./news-has-tag.controller";

// service
import { NewsHasTagService } from "./news-has-tag.service";

// entities
import { NewsHasTag } from "./news-has-tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NewsHasTag])],
  controllers: [NewsHasTagController],
  providers: [NewsHasTagService],
  exports: [NewsHasTagService],
})
export class NewsHasTagModule {}
