import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";

// dto
import { AddShipReqTechDto } from "./dto/add-ship-req-tech.dto";

// services
import { ShipReqTechService } from "./ship-req-tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateShipReqTechDto } from "./dto/update-ship-req-tech.dto";

@Controller("shipReqTechs")
export class ShipReqTechController {
  constructor(private shipReqTechService: ShipReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.shipReqTechService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newShipReqTech: AddShipReqTechDto) {
    return this.shipReqTechService.create(id, newShipReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateShipReqTech: UpdateShipReqTechDto) {
    return this.shipReqTechService.update(id, updateShipReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.shipReqTechService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.shipReqTechService.removeSingle(entityId, remoteId);
  }
}
