import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddShipReqBuildingDto } from "./dto/add-ship-req-building.dto";

// services
import { ShipReqBuildingService } from "./ship-req-building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("shipReqBuildings")
export class ShipReqBuildingController {
  constructor(private shipReqBuildingService: ShipReqBuildingService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.shipReqBuildingService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newShipReqBuilding: AddShipReqBuildingDto) {
    return this.shipReqBuildingService.create(id, newShipReqBuilding);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.shipReqBuildingService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.shipReqBuildingService.removeSingle(entityId, remoteId);
  }
}
