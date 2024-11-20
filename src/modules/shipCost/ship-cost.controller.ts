import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddShipCostDto } from "./dto/add-ship-cost.dto";

// services
import { ShipCostService } from "./ship-cost.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("shipCosts")
export class ShipCostController {
  constructor(private newsShipCostsService: ShipCostService) {}

  @Get(":id")
  getByShipId(@Param("id", ParseIntPipe) id: number) {
    return this.newsShipCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newShipCost: AddShipCostDto) {
    return this.newsShipCostsService.create(id, newShipCost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsShipCostsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsShipCostsService.removeSingle(entityId, remoteId);
  }
}
