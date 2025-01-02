import { Controller, Get, UseGuards } from "@nestjs/common";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

// services
import { GameService } from "./game.service";
import { GameBasicsDto } from "./dto/game-basics.dto";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async getBasics(playerId: number): Promise<GameBasicsDto> {
    return await this.gameService.get(playerId);
  }
}
