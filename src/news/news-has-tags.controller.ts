import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

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
  create(@Body() newNewsHasTag: AddNewsHasTagDto) {
    return this.newsHasTagService.create(newNewsHasTag);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() newsHasTag: AddNewsHasTagDto) {
    return this.newsHasTagService.remove(newsHasTag);
  }
}
