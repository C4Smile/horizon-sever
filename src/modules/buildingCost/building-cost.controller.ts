import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBuildingCostDto } from "./dto/add-building-cost.dto";
import { UpdateBuildingCostDto } from "./dto/update-building-cost.dto";

// services
import { BuildingCostService } from "./building-cost.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller("buildingCosts")
export class BuildingCostController {
  constructor(private buildingCostsService: BuildingCostService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.buildingCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newBuildingCost: AddBuildingCostDto) {
    return this.buildingCostsService.create(id, newBuildingCost);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBuildingCost: UpdateBuildingCostDto,
  ) {
    return this.buildingCostsService.update(id, updateBuildingCost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.buildingCostsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.buildingCostsService.removeSingle(entityId, remoteId);
  }
}
