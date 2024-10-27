import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { TechController } from "./tech.controller";

// service
import { TechService } from "./tech.service";

// entities
import { Tech } from "./entities/tech.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Tech])],
  controllers: [TechController],
  providers: [TechService],
  exports: [TechService],
})
export class TechModule {}
