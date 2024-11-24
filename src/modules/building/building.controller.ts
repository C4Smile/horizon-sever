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
import { LockDto } from "../user/dto/lock.dto";
import { BuildingDto } from "./dto/building.dto";
import { AddBuildingDto } from "./dto/add-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";

// services
import { BuildingService } from "./building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildings")
export class BuildingController {
  constructor(private newsBuildingService: BuildingService) {}

  @Patch(":id/lock")
  lock(@Param("id", ParseIntPipe) id: number, @Body() user: LockDto) {
    return this.newsBuildingService.lock(id, user);
  }

  @Patch(":id/release")
  release(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingService.release(id);
  }

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuilding: AddBuildingDto) {
    return this.newsBuildingService.create(newBuilding);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingDto) {
    return this.newsBuildingService.update(id, data);
  }
}
