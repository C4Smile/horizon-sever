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
import { TagDto } from "./dto/tag.dto";
import { AddTagDto } from "./dto/add-tag.dto";

// services
import { TagService } from "./tag.service";
import { UpdateTagDto } from "./dto/update-tag.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("tag")
export class TagController {
  constructor(private newsTagService: TagService) {}

  @Get()
  get(@Query() query): Promise<TagDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.newsTagService.get({ order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsTagService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newTag: AddTagDto) {
    return this.newsTagService.create(newTag);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.newsTagService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateTagDto) {
    return this.newsTagService.update(id, data);
  }
}
