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
import { Activity } from "./activity.entity";

// utils
import { PagedResult, QueryFilter } from "src/models/types";

// dto
import { ActivityDto } from "./dto/activity.dto";
import { AddActivityDto } from "./dto/add-activity.dto";

// services
import { ActivityService } from "./activity.service";
import { LastActivityDto } from "./dto/LastActivityDto";
import { UpdateActivityDto } from "./dto/update-activity.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("activity")
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  get(@Query() query: QueryFilter): Promise<PagedResult<ActivityDto>> {
    return this.activityService.mappedGet(query);
  }

  @Get("lasts")
  last(): Promise<LastActivityDto[]> {
    return this.activityService.lasts();
  }

  @Get("list")
  list(@Query() query): Promise<LastActivityDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 9, tags = "" } = query;
    return this.activityService.list({ sort, order, page, count, tags });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(Activity, ActivityDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.activityService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newActivity: AddActivityDto) {
    return this.activityService.create(newActivity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.activityService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.activityService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateActivityDto) {
    return this.activityService.update(id, data);
  }
}
