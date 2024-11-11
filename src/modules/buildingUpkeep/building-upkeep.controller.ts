import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBuildingUpkeepDto } from "./dto/add-building-upkeep.dto";

// services
import { BuildingUpkeepService } from "./building-upkeep.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingUpkeeps")
export class BuildingUpkeepController {
  constructor(private newsBuildingUpkeepsService: BuildingUpkeepService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingUpkeepsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newBuildingUpkeep: AddBuildingUpkeepDto) {
    return this.newsBuildingUpkeepsService.create(id, newBuildingUpkeep);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsBuildingUpkeepsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsBuildingUpkeepsService.removeSingle(entityId, remoteId);
  }
}
