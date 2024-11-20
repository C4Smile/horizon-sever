import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ShipReqTechController } from "./ship-req-tech.controller";

// service
import { ShipReqTechService } from "./ship-req-tech.service";

// entities
import { ShipReqTech } from "./entities/ship-req-tech.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ShipReqTech])],
  controllers: [ShipReqTechController],
  providers: [ShipReqTechService],
  exports: [ShipReqTechService],
})
export class ShipReqTechModule {}
