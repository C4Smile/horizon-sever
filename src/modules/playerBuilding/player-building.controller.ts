import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// services
import { PlayerBuildingService } from "./player-building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

// dto
import { EnqueueDto } from "./dto/enqueue.dto";

/** what a player has built, apart from the catalogue `buildings` */
@Controller("player/buildings")
export class PlayerBuildingController {
  constructor(private playerBuildingService: PlayerBuildingService) {}

  @Get("queue/:id")
  @UseGuards(JwtAuthGuard)
  getQueueByPlayerId(@Param("id", ParseIntPipe) id: number) {
    return this.playerBuildingService.getQueueByPlayerId(id);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getBuildingByPlayerId(@Param("id", ParseIntPipe) id: number) {
    return this.playerBuildingService.getBuildingByPlayerId(id);
  }

  @Post("enqueue")
  @UseGuards(JwtAuthGuard)
  enqueue(@Body() dto: EnqueueDto) {
    return this.playerBuildingService.doEnqueue(dto);
  }
}
