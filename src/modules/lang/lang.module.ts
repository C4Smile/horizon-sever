import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { LangController } from "./lang.controller";

// service
import { LangService } from "./lang.service";

// entities
import { Lang } from "./lang.entity";

// automapper
import { LangAutomapper } from "./lang.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lang]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [LangController],
  providers: [LangService, LangAutomapper],
  exports: [LangService, LangAutomapper],
})
export class LangsModule {}
