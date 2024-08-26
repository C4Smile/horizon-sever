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
import { App } from "./app.entity";

// utils
import { PagedResult } from "src/models/types";

// dto
import { AppDto } from "./dto/app.dto";
import { AddAppDto } from "./dto/add-app.dto";

// services
import { AppService } from "./app.service";
import { UpdateAppDto } from "./dto/update-app.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("apps")
export class AppController {
  constructor(private roomStatusService: AppService) {}

  @Get()
  @UseInterceptors(MapInterceptor(App, AppDto, { isArray: true }))
  get(@Query() query): Promise<PagedResult<AppDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.roomStatusService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(App, AppDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomStatusService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newApp: AddAppDto) {
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
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateAppDto) {
    return this.roomStatusService.update(id, data);
  }
}
