import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddCannonReqBuildingDto } from "./dto/add-cannon-req-building.dto";

// services
import { CannonReqBuildingService } from "./cannon-req-building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("cannonReqBuildings")
export class CannonReqBuildingController {
  constructor(private cannonReqBuildingService: CannonReqBuildingService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.cannonReqBuildingService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newCannonReqBuilding: AddCannonReqBuildingDto) {
    return this.cannonReqBuildingService.create(id, newCannonReqBuilding);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.cannonReqBuildingService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.cannonReqBuildingService.removeSingle(entityId, remoteId);
  }
}
