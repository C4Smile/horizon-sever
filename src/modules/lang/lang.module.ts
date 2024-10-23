import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { LangController } from "./lang.controller";

// service
import { LangService } from "./lang.service";

// entities
import { Lang } from "./lang.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Lang])],
  controllers: [LangController],
  providers: [LangService],
  exports: [LangService],
})
export class LangsModule {}
