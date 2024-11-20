import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ShipCostController } from "./ship-cost.controller";

// service
import { ShipCostService } from "./ship-cost.service";

// entities
import { ShipCost } from "./entities/ship-cost.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ShipCost])],
  controllers: [ShipCostController],
  providers: [ShipCostService],
  exports: [ShipCostService],
})
export class ShipCostModule {}
