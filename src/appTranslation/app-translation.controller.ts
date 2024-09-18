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
import { UploadContentDto } from "./dto/upload-content.dto";
import { AppTranslationDto } from "./dto/app-translation.dto";
import { AddAppTranslationDto } from "./dto/add-app-translation.dto";
import { UpdateAppTranslationDto } from "./dto/update-app-translation.dto";

// services
import { AppTranslationService } from "./app-translation.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("applicationTranslation")
export class AppTranslationController {
  constructor(private appTranslationService: AppTranslationService) {}

  @Get()
  @UseInterceptors(MapInterceptor(AppTranslation, AppTranslationDto, { isArray: true }))
  get(@Query() query): Promise<PagedResult<AppTranslation>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.appTranslationService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(AppTranslation, AppTranslationDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.appTranslationService.getById(id);
  }

  @Get("byApplicationId/:appId")
  async getByAppId(@Param("appId", ParseIntPipe) appId: number) {
    return this.appTranslationService.getByAppId(appId);
  }

  @Post("/:appId/upload-translations")
  uploadTranslations(@Param("appId", ParseIntPipe) appId: number, @Body() body: UploadContentDto) {
    return this.appTranslationService.uploadTranslations(appId, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newApp: AddAppTranslationDto) {
    return this.appTranslationService.create(newApp);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.appTranslationService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.appTranslationService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateAppTranslationDto) {
    return this.appTranslationService.update(id, data);
  }
}
