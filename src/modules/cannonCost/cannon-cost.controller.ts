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
import { AddCannonCostDto } from "./dto/add-cannon-cost.dto";
import { UpdateCannonCostDto } from "./dto/update-cannon-cost.dto";

// services
import { CannonCostService } from "./cannon-cost.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("cannonCosts")
export class CannonCostController {
  constructor(private cannonCostsService: CannonCostService) {}

  @Get(":id")
  getByCannonId(@Param("id", ParseIntPipe) id: number) {
    return this.cannonCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newCannonCost: AddCannonCostDto) {
    return this.cannonCostsService.create(id, newCannonCost);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateCannonCost: UpdateCannonCostDto) {
    return this.cannonCostsService.update(id, updateCannonCost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.cannonCostsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.cannonCostsService.removeSingle(entityId, remoteId);
  }
}
