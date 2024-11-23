import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { BuildingController } from "./building.controller";

// service
import { BuildingService } from "./building.service";

// entities
import { Building } from "./entities/building.entity";
import { Photo } from "../image/image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Building, Photo])],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
