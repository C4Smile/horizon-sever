import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { CannonReqBuildingController } from "./cannon-req-building.controller";

// service
import { CannonReqBuildingService } from "./cannon-req-building.service";

// entities
import { CannonReqBuilding } from "./entities/cannon-req-building.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CannonReqBuilding])],
  controllers: [CannonReqBuildingController],
  providers: [CannonReqBuildingService],
  exports: [CannonReqBuildingService],
})
export class CannonReqBuildingModule {}
