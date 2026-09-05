import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// the catalogue the game reads from
import { GameBasicsModule } from "../game/game.module";

// controller
import { PlayerBuildingController } from "./player-building.controller";

// service
import { PlayerBuildingService } from "./player-building.service";

// jobs
import { BuildingQueueService } from "./jobs/Queue";

// entities
import { PlayerBuilding } from "./entities/player-building.entity";
import { BuildingQueue } from "./entities/building-queue.entity";
import { PlayerResource } from "../playerResource/entities/player-resource.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerBuilding, BuildingQueue, PlayerResource]), GameBasicsModule],
  controllers: [PlayerBuildingController],
  providers: [PlayerBuildingService, BuildingQueueService],
  exports: [PlayerBuildingService],
})
export class PlayerBuildingModule {}
