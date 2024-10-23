import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingUpkeepController } from "./building-upkeep.controller";

// service
import { BuildingUpkeepService } from "./building-upkeep.service";

// entities
import { BuildingUpkeep } from "./entities/building-upkeep.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingUpkeep])],
  controllers: [BuildingUpkeepController],
  providers: [BuildingUpkeepService],
  exports: [BuildingUpkeepService],
})
export class BuildingUpkeepModule {}
