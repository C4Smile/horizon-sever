import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { MapInterceptor } from "@automapper/nestjs";

// entity
import { News } from "./news.entity";

// dto
import { NewsDto } from "./dto/news.dto";
import { AddNewsDto } from "./dto/add-news.dto";
import { LastNewsDto } from "./dto/last-news.dto";

// services
import { NewsService } from "./news.service";
import { UpdateNewsDto } from "./dto/update-news.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @UseInterceptors(MapInterceptor(News, NewsDto, { isArray: true }))
  get(@Query() query) {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsService.get({ sort, order, page, count });
  }

  @Get("lasts")
  last(): Promise<LastNewsDto[]> {
    return this.newsService.lasts();
  }

  @Get("list")
  list(@Query() query): Promise<LastNewsDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 9, tags = "" } = query;
    return this.newsService.list({ sort, order, page, count, tags });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(News, NewsDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newNews: AddNewsDto) {
    return this.newsService.create(newNews);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateNewsDto) {
    return this.newsService.update(id, data);
  }
}
