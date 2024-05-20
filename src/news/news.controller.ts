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
} from "@nestjs/common";

// dto
import { NewsDto } from "./dto/news.dto";
import { AddNewsDto } from "./dto/add-news.dto";

// services
import { NewsService } from "./news.service";
import { UpdateNewsDto } from "./dto/update-news.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<NewsDto[]> {
    return this.newsService.get();
  }

  @Get("small-news")
  getSmallNews(@Query() query) {
    const { count } = query;
    return this.newsService.getSmallNews(Number(count));
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newNews: AddNewsDto) {
    return this.newsService.create(newNews);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateNewsDto) {
    return this.newsService.update(id, data);
  }
}
