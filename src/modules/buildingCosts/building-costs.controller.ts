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
import { BuildingCostsDto } from "./dto/building-costs.dto";
import { AddBuildingCostsDto } from "./dto/add-building-costs.dto";

// services
import { BuildingCostsService } from "./building-costs.service";
import { UpdateBuildingCostsDto } from "./dto/update-building-costs.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingCosts")
export class BuildingCostsController {
  constructor(private newsBuildingCostsService: BuildingCostsService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingCostsDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingCostsService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingCostsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuildingCosts: AddBuildingCostsDto) {
    return this.newsBuildingCostsService.create(newBuildingCosts);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingCostsService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingCostsService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingCostsDto) {
    return this.newsBuildingCostsService.update(id, data);
  }
}
