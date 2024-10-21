import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { AppTranslationController } from "./app-translation.controller";

// service
import { AppTranslationService } from "./app-translation.service";

// entities
import { Lang } from "../lang/lang.entity";
import { App } from "src/modules/app/app.entity";
import { AppTranslation } from "./app-translation.entity";
import { LangTranslation } from "../langTranslation/lang-translation.entity";

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
