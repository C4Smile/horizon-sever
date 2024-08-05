import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

// dto
import { AddNewsHasImageDto } from "./dto/add-news-has-image.dto";

// services
import { NewsHasImageService } from "./news-has-image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("newsHasImage")
export class NewsHasImageController {
  constructor(private newsService: NewsHasImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newNews: AddNewsHasImageDto) {
    return this.newsService.create(newNews);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() toDelete: number[]) {
    return this.newsService.remove(toDelete);
  }
}
