import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { NewsTagController } from "./news-tag.controller";

// service
import { NewsTagService } from "./news-tag.service";

// entities
import { NewsTag } from "./news-tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NewsTag])],
  controllers: [NewsTagController],
  providers: [NewsTagService],
  exports: [NewsTagService],
})
export class NewsTagModule {}
