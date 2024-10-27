import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { TechCostsController } from "./tech-costs.controller";

// service
import { TechCostsService } from "./tech-costs.service";

// entities
import { TechCosts } from "./entities/tech-costs.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TechCosts])],
  controllers: [TechCostsController],
  providers: [TechCostsService],
  exports: [TechCostsService],
})
export class TechCostsModule {}
