import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ShipController } from "./ship.controller";

// service
import { ShipService } from "./ship.service";

// entities
import { Ship } from "./entities/ship.entity";
import { Photo } from "../image/image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Photo])],
  controllers: [ShipController],
  providers: [ShipService],
  exports: [ShipService],
})
export class ShipModule {}
