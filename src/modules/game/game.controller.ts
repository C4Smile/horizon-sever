import { Controller, Get, UseGuards } from "@nestjs/common";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

// services
import { GameService } from "./game.service";
import { GameBasicsDto } from "./dto/game-basics.dto";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getBasics(): GameBasicsDto {
    return this.gameService.get();
  }
}
