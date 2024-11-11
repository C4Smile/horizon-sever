import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddBuildingReqTechDto } from "./dto/add-building-req-tech.dto";

// services
import { BuildingReqTechService } from "./building-req-tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingReqTechs")
export class BuildingReqTechController {
  constructor(private newsTechReqTechService: BuildingReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechReqTechService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechReqTech: AddBuildingReqTechDto) {
    return this.newsTechReqTechService.create(id, newTechReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsTechReqTechService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsTechReqTechService.removeSingle(entityId, remoteId);
  }
}
