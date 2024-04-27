import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

// dto
import { NewsTagDto } from "./dto/news-tag.dto";
import { AddNewsTagDto } from "./dto/add-news-tag.dto";

// services
import { NewsTagService } from "./news-tag.service";
import { UpdateNewsTagDto } from "./dto/update-news-tag.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("news-tag")
export class NewsTagController {
  constructor(private newsTagService: NewsTagService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<NewsTagDto[]> {
    return this.newsTagService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsTagService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newNewsTag: AddNewsTagDto) {
    return this.newsTagService.create(newNewsTag);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.newsTagService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateNewsTagDto) {
    return this.newsTagService.update(id, data);
  }
}
