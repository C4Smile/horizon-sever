import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { TechReqBuildingController } from "./tech-req-building.controller";

// service
import { TechReqBuildingService } from "./tech-req-building.service";

// entities
import { TechReqBuilding } from "./entities/tech-req-building.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TechReqBuilding])],
  controllers: [TechReqBuildingController],
  providers: [TechReqBuildingService],
  exports: [TechReqBuildingService],
})
export class TechReqBuildingModule {}
