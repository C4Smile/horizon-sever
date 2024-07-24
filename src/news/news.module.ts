import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";

// automapper
import { NewsAutomapper } from "./news.automapper";

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
import { AutomapperModule } from "@automapper/nestjs";

@Module({
  imports: [
    TypeOrmModule.forFeature([News, NewsHasTag]),
    TagModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [NewsController, NewsHasTagController],
  providers: [NewsService, NewsHasTagService, NewsAutomapper],
  exports: [NewsService, NewsHasTagService],
})
export class NewsModule {}
