import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBuildingProducesDto } from "./dto/add-building-produces.dto";

// services
import { BuildingProducesService } from "./building-produces.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingProduces")
export class BuildingProducesController {
  constructor(private newsBuildingProducesService: BuildingProducesService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.newsBuildingProducesService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newBuildingProduce: AddBuildingProducesDto) {
    return this.newsBuildingProducesService.create(id, newBuildingProduce);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsBuildingProducesService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsBuildingProducesService.removeSingle(entityId, remoteId);
  }
}
