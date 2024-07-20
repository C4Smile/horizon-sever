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
  get(@Query() query): Promise<ActivityDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.activityService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.activityService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newActivity: AddActivityDto) {
    return this.activityService.create(newActivity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.activityService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateActivityDto) {
    return this.activityService.update(id, data);
  }
}
