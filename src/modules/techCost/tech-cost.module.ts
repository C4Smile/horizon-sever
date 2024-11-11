import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { TechCostsController } from "./tech-cost.controller";

// service
import { TechCostService } from "./tech-cost.service";

// entities
import { TechCost } from "./entities/tech-cost.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TechCost])],
  controllers: [TechCostsController],
  providers: [TechCostService],
  exports: [TechCostService],
})
export class TechCostModule {}
