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
import { BuildingTypeDto } from "./dto/building-type.dto";
import { AddBuildingTypeDto } from "./dto/add-building-type.dto";
import { UpdateBuildingTypeDto } from "./dto/update-building-type.dto";

// services
import { BuildingTypeService } from "./building-type.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingTypes")
export class BuildingTypeController {
  constructor(private newsBuildingTypeService: BuildingTypeService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingTypeDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingTypeService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingTypeService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuildingType: AddBuildingTypeDto) {
    return this.newsBuildingTypeService.create(newBuildingType);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingTypeService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingTypeService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingTypeDto) {
    return this.newsBuildingTypeService.update(id, data);
  }
}
