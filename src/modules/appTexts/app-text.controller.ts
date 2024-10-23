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

// entity
import { PagedResult } from "src/modules/models/types";

// dto
import { AppTextDto } from "./dto/app-text.dto";
import { AddAppTextDto } from "./dto/add-app-text.dto";

// services
import { AppTextService } from "./app-text.service";
import { UpdateAppTextDto } from "./dto/update-app-text.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("appText")
export class AppTextController {
  constructor(private newsAppTextService: AppTextService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<AppTextDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsAppTextService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsAppTextService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newAppText: AddAppTextDto) {
    return this.newsAppTextService.create(newAppText);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsAppTextService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsAppTextService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateAppTextDto) {
    return this.newsAppTextService.update(id, data);
  }
}
