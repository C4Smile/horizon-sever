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
  UseInterceptors,
} from "@nestjs/common";
import { MapInterceptor } from "@automapper/nestjs";

// entity
import { Lang } from "./lang.entity";

// utils
import { PagedResult } from "src/models/types";

// dto
import { LangDto } from "./dto/lang.dto";
import { AddLangDto } from "./dto/add-lang.dto";

// services
import { LangService } from "./lang.service";
import { UpdateLangDto } from "./dto/update-lang.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("lang")
export class LangController {
  constructor(private roomStatusService: LangService) {}

  @Get()
  @UseInterceptors(MapInterceptor(Lang, LangDto, { isArray: true }))
  get(@Query() query): Promise<PagedResult<LangDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.roomStatusService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(Lang, LangDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomStatusService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newLang: AddLangDto) {
    return this.roomStatusService.create(newLang);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.roomStatusService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.roomStatusService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateLangDto) {
    return this.roomStatusService.update(id, data);
  }
}
