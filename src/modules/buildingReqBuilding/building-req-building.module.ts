import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingReqBuildingController } from "./building-req-building.controller";

// service
import { BuildingReqBuildingService } from "./building-req-building.service";

// entities
import { BuildingReqBuilding } from "./entities/building-req-building.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingReqBuilding])],
  controllers: [BuildingReqBuildingController],
  providers: [BuildingReqBuildingService],
  exports: [BuildingReqBuildingService],
})
export class BuildingReqBuildingModule {}
