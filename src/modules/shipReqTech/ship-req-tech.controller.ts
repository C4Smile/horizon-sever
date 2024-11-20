import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddShipReqTechDto } from "./dto/add-ship-req-tech.dto";

// services
import { ShipReqTechService } from "./ship-req-tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("shipReqTechs")
export class ShipReqTechController {
  constructor(private shipShipReqTechService: ShipReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.shipShipReqTechService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newShipReqTech: AddShipReqTechDto) {
    return this.shipShipReqTechService.create(id, newShipReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.shipShipReqTechService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.shipShipReqTechService.removeSingle(entityId, remoteId);
  }
}
