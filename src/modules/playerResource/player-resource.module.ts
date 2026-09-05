import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// the catalogue the game reads from
import { GameBasicsModule } from "../game/game.module";

// controller
import { PlayerResourceController } from "./player-resource.controller";

// service
import { PlayerResourceService } from "./player-resource.service";

// jobs
import { ResourceProductionService } from "./jobs/Production";

// entities
import { PlayerResource } from "./entities/player-resource.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerResource]), GameBasicsModule],
  controllers: [PlayerResourceController],
  providers: [PlayerResourceService, ResourceProductionService],
  exports: [PlayerResourceService],
})
export class PlayerResourceModule {}
