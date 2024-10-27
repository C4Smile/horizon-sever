import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingReqTechController } from "./building-req-tech.controller";

// service
import { BuildingReqTechService } from "./building-req-tech.service";

// entities
import { BuildingReqTech } from "./entities/building-req-tech.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingReqTech])],
  controllers: [BuildingReqTechController],
  providers: [BuildingReqTechService],
  exports: [BuildingReqTechService],
})
export class BuildingReqTechModule {}
