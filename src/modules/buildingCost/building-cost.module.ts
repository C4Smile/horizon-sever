import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingCostController } from "./building-cost.controller";

// service
import { BuildingCostService } from "./building-cost.service";

// entities
import { BuildingCost } from "./entities/building-cost.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingCost])],
  controllers: [BuildingCostController],
  providers: [BuildingCostService],
  exports: [BuildingCostService],
})
export class BuildingCostModule {}
