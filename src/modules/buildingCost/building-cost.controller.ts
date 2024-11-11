import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBuildingCostDto } from "./dto/add-building-cost.dto";

// services
import { BuildingCostService } from "./building-cost.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingCosts")
export class BuildingCostController {
  constructor(private newsBuildingCostsService: BuildingCostService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newBuildingCost: AddBuildingCostDto) {
    return this.newsBuildingCostsService.create(id, newBuildingCost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsBuildingCostsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsBuildingCostsService.removeSingle(entityId, remoteId);
  }
}
