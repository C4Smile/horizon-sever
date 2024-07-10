import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddNewsHasTagDto } from "./dto/add-news-has-tag.dto";

// services
import { NewsHasTagService } from "./news-has-tag.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("newsHasTag")
export class NewsHasTagController {
  constructor(private newsHasTagService: NewsHasTagService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newNews: AddNewsHasTagDto) {
    return this.newsHasTagService.create(newNews);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.newsHasTagService.remove(id);
  }
}
