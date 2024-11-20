import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ShipController } from "./ship.controller";

// service
import { ShipService } from "./ship.service";

// entities
import { Ship } from "./entities/ship.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ship])],
  controllers: [ShipController],
  providers: [ShipService],
  exports: [ShipService],
})
export class ShipModule {}
