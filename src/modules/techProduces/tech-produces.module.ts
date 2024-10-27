import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { TechProducesController } from "./tech-produces.controller";

// service
import { TechProducesService } from "./tech-produces.service";

// entities
import { TechProduces } from "./entities/tech-produces.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TechProduces])],
  controllers: [TechProducesController],
  providers: [TechProducesService],
  exports: [TechProducesService],
})
export class TechProducesModule {}
