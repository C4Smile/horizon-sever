import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingTechReqController } from "./building-tech-req.controller";

// service
import { BuildingTechReqService } from "./building-tech-req.service";

// entities
import { BuildingTechReq } from "./entities/building-tech-req.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingTechReq])],
  controllers: [BuildingTechReqController],
  providers: [BuildingTechReqService],
  exports: [BuildingTechReqService],
})
export class BuildingTechReqModule {}
