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
  constructor(private newsCannonCostsService: CannonCostService) {}

  @Get(":id")
  getByCannonId(@Param("id", ParseIntPipe) id: number) {
    return this.newsCannonCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newCannonCost: AddCannonCostDto) {
    return this.newsCannonCostsService.create(id, newCannonCost);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() newTechReqTech: UpdateCannonCostDto) {
    return this.newsCannonCostsService.update(id, newTechReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsCannonCostsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsCannonCostsService.removeSingle(entityId, remoteId);
  }
}
