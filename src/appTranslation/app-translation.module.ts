import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { AppTranslationController } from "./app-translation.controller";

// service
import { AppTranslationService } from "./app-translation.service";

// entities
import { App } from "src/app/app.entity";
import { Lang } from "src/lang/lang.entity";
import { AppTranslation } from "./app-translation.entity";
import { LangTranslation } from "src/langTranslation/lang-translation.entity";

// automapper
import { AppTranslationAutomapper } from "./app-translation.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([AppTranslation, LangTranslation, Lang, App]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [AppTranslationController],
  providers: [AppTranslationService, AppTranslationAutomapper],
  exports: [AppTranslationService, AppTranslationAutomapper],
})
export class AppTranslationModule {}
