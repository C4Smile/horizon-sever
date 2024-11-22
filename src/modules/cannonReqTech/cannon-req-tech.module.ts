import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { CannonReqTechController } from "./cannon-req-tech.controller";

// service
import { CannonReqTechService } from "./cannon-req-tech.service";

// entities
import { CannonReqTech } from "./entities/cannon-req-tech.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CannonReqTech])],
  controllers: [CannonReqTechController],
  providers: [CannonReqTechService],
  exports: [CannonReqTechService],
})
export class CannonReqTechModule {}
