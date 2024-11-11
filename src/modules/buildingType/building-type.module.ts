import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingTypeController } from "./building-type.controller";

// service
import { BuildingTypeService } from "./building-type.service";

// entities
import { BuildingType } from "./entities/building-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingType])],
  controllers: [BuildingTypeController],
  providers: [BuildingTypeService],
  exports: [BuildingTypeService],
})
export class BuildingTypeModule {}
