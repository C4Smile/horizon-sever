import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ShipReqBuildingController } from "./ship-req-building.controller";

// service
import { ShipReqBuildingService } from "./ship-req-building.service";

// entities
import { ShipReqBuilding } from "./entities/ship-req-building.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ShipReqBuilding])],
  controllers: [ShipReqBuildingController],
  providers: [ShipReqBuildingService],
  exports: [ShipReqBuildingService],
})
export class ShipReqBuildingModule {}
