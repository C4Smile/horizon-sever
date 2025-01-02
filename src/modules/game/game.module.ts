import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";

// entities
import { Resource } from "../resource/entities/resource.entity";

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Resource])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameBasicsModule {}
