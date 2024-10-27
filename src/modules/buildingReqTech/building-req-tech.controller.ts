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
import { BuildingReqTechDto } from "./dto/building-req-tech.dto";
import { AddBuildingReqTechDto } from "./dto/add-building-req-tech.dto";
import { UpdateBuildingReqTechDto } from "./dto/update-building-req-tech.dto";

// services
import { BuildingReqTechService } from "./building-req-tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingReqTech")
export class BuildingReqTechController {
  constructor(private newsBuildingReqTechService: BuildingReqTechService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingReqTechDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingReqTechService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingReqTechService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuildingReqTech: AddBuildingReqTechDto) {
    return this.newsBuildingReqTechService.create(newBuildingReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingReqTechService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingReqTechService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingReqTechDto) {
    return this.newsBuildingReqTechService.update(id, data);
  }
}
