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
import { TechReqBuildingDto } from "./dto/tech-req-building.dto";
import { AddTechReqBuildingDto } from "./dto/add-tech-req-building.dto";
import { UpdateTechReqBuildingDto } from "./dto/update-tech-req-building.dto";

// services
import { TechReqBuildingService } from "./tech-req-building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("TechReqBuilding")
export class TechReqBuildingController {
  constructor(private newsTechReqBuildingService: TechReqBuildingService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<TechReqBuildingDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsTechReqBuildingService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechReqBuildingService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newTechReqBuilding: AddTechReqBuildingDto) {
    return this.newsTechReqBuildingService.create(newTechReqBuilding);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechReqBuildingService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsTechReqBuildingService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateTechReqBuildingDto) {
    return this.newsTechReqBuildingService.update(id, data);
  }
}
