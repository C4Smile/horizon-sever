import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ShipUpkeepController } from "./ship-upkeep.controller";

// service
import { ShipUpkeepService } from "./ship-upkeep.service";

// entities
import { ShipUpkeep } from "./entities/ship-upkeep.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ShipUpkeep])],
  controllers: [ShipUpkeepController],
  providers: [ShipUpkeepService],
  exports: [ShipUpkeepService],
})
export class ShipUpkeepModule {}
