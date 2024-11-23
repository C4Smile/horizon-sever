import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { CannonController } from "./cannon.controller";

// service
import { CannonService } from "./cannon.service";

// entities
import { Cannon } from "./entities/cannon.entity";
import { Photo } from "../image/image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cannon, Photo])],
  controllers: [CannonController],
  providers: [CannonService],
  exports: [CannonService],
})
export class CannonModule {}
