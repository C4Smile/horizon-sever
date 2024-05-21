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
import { TagDto } from "./dto/tag.dto";
import { AddTagDto } from "./dto/add-tag.dto";

// services
import { TagService } from "./tag.service";
import { UpdateTagDto } from "./dto/update-tag.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("tags")
export class TagController {
  constructor(private newsTagService: TagService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<TagDto[]> {
    return this.newsTagService.get();
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
