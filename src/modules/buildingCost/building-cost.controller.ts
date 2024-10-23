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
import { BuildingCostDto } from "./dto/building-cost.dto";
import { AddBuildingCostDto } from "./dto/add-building-cost.dto";

// services
import { BuildingCostService } from "./building-cost.service";
import { UpdateBuildingCostDto } from "./dto/update-building-cost.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingCost")
export class BuildingCostController {
  constructor(private newsBuildingCostService: BuildingCostService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingCostDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingCostService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingCostService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuildingCost: AddBuildingCostDto) {
    return this.newsBuildingCostService.create(newBuildingCost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingCostService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingCostService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingCostDto) {
    return this.newsBuildingCostService.update(id, data);
  }
}
