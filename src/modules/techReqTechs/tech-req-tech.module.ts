import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { TechReqTechsController } from "./tech-req-techs.controller";

// service
import { TechReqTechService } from "./tech-req-techs.service";

// entities
import { TechReqTechs } from "./entities/tech-req-techs.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TechReqTechs])],
  controllers: [TechReqTechsController],
  providers: [TechReqTechService],
  exports: [TechReqTechService],
})
export class TechReqTechModule {}
