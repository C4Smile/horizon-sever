import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBuildingReqBuildingDto } from "./dto/add-building-req-building.dto";

// services
import { BuildingReqBuildingService } from "./building-req-building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingReqBuildings")
export class BuildingReqBuildingController {
  constructor(private newsReqBuildingService: BuildingReqBuildingService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.newsReqBuildingService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(
    @Param("id", ParseIntPipe) id: number,
    @Body() newBuildingReqBuilding: AddBuildingReqBuildingDto,
  ) {
    return this.newsReqBuildingService.create(id, newBuildingReqBuilding);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsReqBuildingService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsReqBuildingService.removeSingle(entityId, remoteId);
  }
}
