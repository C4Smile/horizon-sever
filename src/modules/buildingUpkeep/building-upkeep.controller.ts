import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBuildingUpkeepDto } from "./dto/add-building-upkeep.dto";
import { UpdateBuildingUpkeepDto } from "./dto/update-building-cost.dto";

// services
import { BuildingUpkeepService } from "./building-upkeep.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingUpkeeps")
export class BuildingUpkeepController {
  constructor(private buildingUpkeepsService: BuildingUpkeepService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.buildingUpkeepsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newBuildingUpkeep: AddBuildingUpkeepDto) {
    return this.buildingUpkeepsService.create(id, newBuildingUpkeep);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateBuildingUpkeep: UpdateBuildingUpkeepDto) {
    return this.buildingUpkeepsService.update(id, updateBuildingUpkeep);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.buildingUpkeepsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.buildingUpkeepsService.removeSingle(entityId, remoteId);
  }
}
