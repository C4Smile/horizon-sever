import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameBasicsModule {}
