import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// services
import { BuildingService } from "./building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

// dto
import { EnqueueDto } from "./dto/enqueue.dto";

@Controller("buildings")
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  @Get("/player/:id")
  @UseGuards(JwtAuthGuard)
  getBuildingByPlayerId(@Param("id", ParseIntPipe) id: number) {
    return this.buildingService.getBuildingByPlayerId(id);
  }

  @Get("/queue/player/:id")
  @UseGuards(JwtAuthGuard)
  getQueueByPlayerId(@Param("id", ParseIntPipe) id: number) {
    return this.buildingService.getQueueByPlayerId(id);
  }

  @Post("/enqueue")
  @UseGuards(JwtAuthGuard)
  enqueue(@Body() dto: EnqueueDto) {
    return this.buildingService.doEnqueue(dto);
  }
}
