import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { PlayerResourceController } from "./player-resource.controller";

// service
import { PlayerResourceService } from "./player-resource.service";

// jobs
import { ResourceProductionService } from "./jobs/Production";

// entities
import { PlayerResource } from "./entities/player-resource.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerResource])],
  controllers: [PlayerResourceController],
  providers: [PlayerResourceService, ResourceProductionService],
  exports: [PlayerResourceService],
})
export class PlayerResourceModule {}
