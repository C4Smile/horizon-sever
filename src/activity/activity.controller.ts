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

// dto
import { ActivityDto } from "./dto/activity.dto";
import { AddActivityDto } from "./dto/add-activity.dto";

// services
import { ActivityService } from "./activity.service";
import { UpdateActivityDto } from "./dto/update-activity.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("activity")
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  @UseInterceptors(MapInterceptor(Activity, ActivityDto, { isArray: true }))
  get(@Query() query) {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.activityService.get({ sort, order, page, count });
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
