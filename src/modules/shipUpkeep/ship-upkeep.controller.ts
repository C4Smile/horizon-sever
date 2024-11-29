import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";

// dto
import { AddShipUpkeepDto } from "./dto/add-ship-upkeep.dto";

// services
import { ShipUpkeepService } from "./ship-upkeep.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateShipUpkeepDto } from "./dto/update-ship-cost.dto";

@Controller("shipUpkeeps")
export class ShipUpkeepController {
  constructor(private shipUpkeepsService: ShipUpkeepService) {}

  @Get(":id")
  getByShipId(@Param("id", ParseIntPipe) id: number) {
    return this.shipUpkeepsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newShipUpkeep: AddShipUpkeepDto) {
    return this.shipUpkeepsService.create(id, newShipUpkeep);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateShipKeep: UpdateShipUpkeepDto) {
    return this.shipUpkeepsService.update(id, updateShipKeep);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.shipUpkeepsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.shipUpkeepsService.removeSingle(entityId, remoteId);
  }
}
