import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { LangTranslationController } from "./lang-translation.controller";

// service
import { LangTranslationService } from "./lang-translation.service";

// entity
import { LangTranslation } from "./lang-translation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LangTranslation])],
  controllers: [LangTranslationController],
  providers: [LangTranslationService],
  exports: [LangTranslationService],
})
export class LangTranslationModule {}
