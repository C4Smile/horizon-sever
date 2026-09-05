import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";

// services
import { PlayerResourceService } from "./player-resource.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

/**
 * Mounted apart from the catalogue `resources` on purpose: this answers what a
 * player holds, not what a resource is.
 */
@Controller("player/resources")
export class PlayerResourceController {
  constructor(private playerResourceService: PlayerResourceService) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getByPlayerId(@Param("id", ParseIntPipe) id: number) {
    return this.playerResourceService.getByPlayerId(id);
  }
}
