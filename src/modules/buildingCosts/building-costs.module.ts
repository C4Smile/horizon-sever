import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingCostsController } from "./building-costs.controller";

// service
import { BuildingCostsService } from "./building-costs.service";

// entities
import { BuildingCosts } from "./entities/building-costs.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingCosts])],
  controllers: [BuildingCostsController],
  providers: [BuildingCostsService],
  exports: [BuildingCostsService],
})
export class BuildingCostsModule {}
