import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { TechTypeController } from "./tech-type.controller";

// service
import { TechTypeService } from "./tech-type.service";

// entities
import { TechType } from "./entities/tech-type.entity";
import { Photo } from "../image/image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TechType, Photo])],
  controllers: [TechTypeController],
  providers: [TechTypeService],
  exports: [TechTypeService],
})
export class TechTypeModule {}
