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
import { BuildingUpkeepDto } from "./dto/building-upkeep.dto";
import { AddBuildingUpkeepDto } from "./dto/add-building-upkeep.dto";
import { UpdateBuildingUpkeepDto } from "./dto/update-building-upkeep.dto";

// services
import { BuildingUpkeepService } from "./building-upkeep.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingUpkeep")
export class BuildingUpkeepController {
  constructor(private newsBuildingUpkeepService: BuildingUpkeepService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingUpkeepDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingUpkeepService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingUpkeepService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuildingUpkeep: AddBuildingUpkeepDto) {
    return this.newsBuildingUpkeepService.create(newBuildingUpkeep);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingUpkeepService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingUpkeepService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingUpkeepDto) {
    return this.newsBuildingUpkeepService.update(id, data);
  }
}
