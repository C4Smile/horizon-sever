import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddNewsHasImageDto } from "./dto/add-news-has-image.dto";

// services
import { NewsHasImageService } from "./news-has-image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("newsHasImage")
export class NewsHasImageController {
  constructor(private newsHasImageService: NewsHasImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newNews: AddNewsHasImageDto) {
    return this.newsHasImageService.create(newNews);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.newsHasImageService.remove(id);
  }
}
