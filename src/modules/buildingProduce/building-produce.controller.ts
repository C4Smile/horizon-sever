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
import { BuildingProduceDto } from "./dto/building-produce.dto";
import { AddBuildingProduceDto } from "./dto/add-building-produce.dto";
import { UpdateBuildingProduceDto } from "./dto/update-building-produce.dto";

// services
import { BuildingProduceService } from "./building-produce.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingProduce")
export class BuildingProduceController {
  constructor(private newsBuildingProduceService: BuildingProduceService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<BuildingProduceDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsBuildingProduceService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingProduceService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newBuildingProduce: AddBuildingProduceDto) {
    return this.newsBuildingProduceService.create(newBuildingProduce);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsBuildingProduceService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsBuildingProduceService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBuildingProduceDto) {
    return this.newsBuildingProduceService.update(id, data);
  }
}
