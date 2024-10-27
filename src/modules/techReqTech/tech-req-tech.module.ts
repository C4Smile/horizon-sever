import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { TechReqTechController } from "./tech-req-tech.controller";

// service
import { TechReqTechService } from "./tech-req-tech.service";

// entities
import { TechReqTech } from "./entities/tech-req-tech.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TechReqTech])],
  controllers: [TechReqTechController],
  providers: [TechReqTechService],
  exports: [TechReqTechService],
})
export class TechReqTechModule {}
