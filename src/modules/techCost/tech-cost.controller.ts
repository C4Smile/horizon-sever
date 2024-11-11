import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";

// dto
import { AddTechCostDto } from "./dto/add-tech-cost.dto";

// services
import { TechCostService } from "./tech-cost.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techCosts")
export class TechCostsController {
  constructor(private newsTechCostsService: TechCostService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechCost: AddTechCostDto) {
    return this.newsTechCostsService.create(id, newTechCost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsTechCostsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsTechCostsService.removeSingle(entityId, remoteId);
  }
}
