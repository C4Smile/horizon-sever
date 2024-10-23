import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { AppTranslationController } from "./app-translation.controller";

// service
import { AppTranslationService } from "./app-translation.service";

// entities
import { Lang } from "../lang/lang.entity";
import { App } from "src/modules/app/entities/app.entity";
import { AppTranslation } from "./entities/app-translation.entity";
import { LangTranslation } from "../langTranslation/entities/lang-translation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AppTranslation, LangTranslation, Lang, App])],
  controllers: [AppTranslationController],
  providers: [AppTranslationService],
  exports: [AppTranslationService],
})
export class AppTranslationModule {}
