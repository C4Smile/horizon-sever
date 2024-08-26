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
import { AppTranslation } from "./app-translation.entity";

// utils
import { PagedResult } from "src/models/types";

// dto
import { AppTranslationDto } from "./dto/app-translation.dto";
import { AddAppTranslationDto } from "./dto/add-app-translation.dto";
import { UpdateAppTranslationDto } from "./dto/update-app-translation.dto";

// services
import { AppTranslationService } from "./app-translation.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("appTranslations")
export class AppTranslationController {
  constructor(private roomStatusService: AppTranslationService) {}

  @Get()
  @UseInterceptors(MapInterceptor(AppTranslation, AppTranslationDto, { isArray: true }))
  get(@Query() query): Promise<PagedResult<AppTranslationDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.roomStatusService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(AppTranslation, AppTranslationDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomStatusService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newApp: AddAppTranslationDto) {
    return this.roomStatusService.create(newApp);
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
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateAppTranslationDto) {
    return this.roomStatusService.update(id, data);
  }
}
