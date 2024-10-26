import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingProduceController } from "./building-produce.controller";

// service
import { BuildingProduceService } from "./building-produce.service";

// entities
import { BuildingProduce } from "./entities/building-produce.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BuildingProduce])],
  controllers: [BuildingProduceController],
  providers: [BuildingProduceService],
  exports: [BuildingProduceService],
})
export class BuildingProduceModule {}
