import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

// dto
import { AddShipCostDto } from "./dto/add-ship-cost.dto";
import { UpdateShipCostDto } from "./dto/update-ship-cost.dto";

// services
import { ShipCostService } from "./ship-cost.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("shipCosts")
export class ShipCostController {
  constructor(private shipCostsService: ShipCostService) {}

  @Get(":id")
  getByShipId(@Param("id", ParseIntPipe) id: number) {
    return this.shipCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newShipCost: AddShipCostDto) {
    return this.shipCostsService.create(id, newShipCost);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateShipCost: UpdateShipCostDto) {
    return this.shipCostsService.update(id, updateShipCost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.shipCostsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.shipCostsService.removeSingle(entityId, remoteId);
  }
}
