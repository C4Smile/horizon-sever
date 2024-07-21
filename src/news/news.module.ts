import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { NewsController } from "./news.controller";

// service
import { NewsService } from "./news.service";
import { NewsHasTagService } from "./news-has-tag.service";

// entities
import { News } from "./news.entity";
import { NewsHasTag } from "./news-has-tag.entity";

// modules
import { TagModule } from "src/tags/tag.module";
import { NewsHasTagController } from "./news-has-tags.controller";

@Module({
  imports: [TypeOrmModule.forFeature([News, NewsHasTag]), TagModule],
  controllers: [NewsController, NewsHasTagController],
  providers: [NewsService, NewsHasTagService],
  exports: [NewsService, NewsHasTagService],
})
export class NewsModule {}
