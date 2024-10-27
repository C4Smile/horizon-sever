import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingProducesController } from "./building-produces.controller";

// service
import { BuildingProducesService } from "./building-produces.service";

// entities
import { BuildingProduces } from "./entities/building-produces.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingProduces])],
  controllers: [BuildingProducesController],
  providers: [BuildingProducesService],
  exports: [BuildingProducesService],
})
export class BuildingProduceModule {}
