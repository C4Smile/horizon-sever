import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { NationController } from "./nation.controller";

// service
import { NationService } from "./nation.service";

// entities
import { Nation } from "./entities/nation.entity";
import { Photo } from "../image/image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Nation, Photo])],
  controllers: [NationController],
  providers: [NationService],
  exports: [NationService],
})
export class NationModule {}
