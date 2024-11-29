import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBuildingReqTechDto } from "./dto/add-building-req-tech.dto";
import { UpdateBuildingReqTechDto } from "./dto/update-building-req-tech.dto";

// services
import { BuildingReqTechService } from "./building-req-tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingReqTechs")
export class BuildingReqTechController {
  constructor(private buildingBuildingReqTechService: BuildingReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.buildingBuildingReqTechService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newBuildingReqTech: AddBuildingReqTechDto) {
    return this.buildingBuildingReqTechService.create(id, newBuildingReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBuildingUpkeep: UpdateBuildingReqTechDto,
  ) {
    return this.buildingBuildingReqTechService.update(id, updateBuildingUpkeep);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.buildingBuildingReqTechService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.buildingBuildingReqTechService.removeSingle(entityId, remoteId);
  }
}
