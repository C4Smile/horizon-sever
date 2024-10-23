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
import { BuildingTechReqDto } from "./dto/building-tech-req.dto";
import { AddBuildingTechReqDto } from "./dto/add-building-tech-req.dto";
import { UpdateBuildingTechReqDto } from "./dto/update-building-tech-req.dto";

// services
import { BuildingTechReqService } from "./building-tech-req.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingTechReq")
export class BuildingTechReqController {
  constructor(private newsBuildingTechReqService: BuildingTechReqService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingTechReqDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingTechReqService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingTechReqService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuildingTechReq: AddBuildingTechReqDto) {
    return this.newsBuildingTechReqService.create(newBuildingTechReq);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingTechReqService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingTechReqService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingTechReqDto) {
    return this.newsBuildingTechReqService.update(id, data);
  }
}
