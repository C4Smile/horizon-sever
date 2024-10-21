import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";

// dto
import { BlobDto } from "./dto/blob.dto";
import { AddBlobDto } from "./dto/add-blob.dto";

// services
import { ImageService } from "./image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PagedResult } from "src/modules/models/types";

@Controller("images")
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BlobDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.imageService.getAll({ sort, order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() newEvent: AddBlobDto) {
    return await this.imageService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.imageService.remove(id);
  }
}
