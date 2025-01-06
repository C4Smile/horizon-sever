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
import { BuildingDto } from "./dto/building.dto";

// services
import { BuildingService } from "./building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildings")
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.buildingService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.buildingService.getById(id);
  }

  @Get("/player/:id")
  @UseGuards(JwtAuthGuard)
  getByPlayerId(@Param("id", ParseIntPipe) id: number) {
    return this.buildingService.getByPlayerId(id);
  }
}
