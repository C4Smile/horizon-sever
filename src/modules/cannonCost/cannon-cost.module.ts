import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { CannonCostController } from "./cannon-cost.controller";

// service
import { CannonCostService } from "./cannon-cost.service";

// entities
import { CannonCost } from "./entities/cannon-cost.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CannonCost])],
  controllers: [CannonCostController],
  providers: [CannonCostService],
  exports: [CannonCostService],
})
export class CannonCostModule {}
