import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { NewsController } from "./news.controller";

// service
import { NewsService } from "./news.service";

// entities
import { News } from "./news.entity";
import { ProvinceModule } from "src/province/province.module";
import { TagModule } from "src/tags/tag.module";

@Module({
  imports: [TypeOrmModule.forFeature([News]), ProvinceModule, TagModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
