import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddShipUpkeepDto } from "./dto/add-ship-upkeep.dto";

// services
import { ShipUpkeepService } from "./ship-upkeep.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("shipUpkeeps")
export class ShipUpkeepController {
  constructor(private newsShipUpkeepsService: ShipUpkeepService) {}

  @Get(":id")
  getByShipId(@Param("id", ParseIntPipe) id: number) {
    return this.newsShipUpkeepsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newShipUpkeep: AddShipUpkeepDto) {
    return this.newsShipUpkeepsService.create(id, newShipUpkeep);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsShipUpkeepsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsShipUpkeepsService.removeSingle(entityId, remoteId);
  }
}
