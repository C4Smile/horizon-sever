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
import { BuildingProducesDto } from "./dto/building-produces.dto";
import { AddBuildingProducesDto } from "./dto/add-building-produces.dto";
import { UpdateBuildingProducesDto } from "./dto/update-building-produces.dto";

// services
import { BuildingProducesService } from "./building-produces.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingProduce")
export class BuildingProducesController {
  constructor(private newsBuildingProducesService: BuildingProducesService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingProducesDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingProducesService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingProducesService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuildingProduce: AddBuildingProducesDto) {
    return this.newsBuildingProducesService.create(newBuildingProduce);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingProducesService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingProducesService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingProducesDto) {
    return this.newsBuildingProducesService.update(id, data);
  }
}
