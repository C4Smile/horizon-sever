import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { AppTextController } from "./app-text.controller";

// service
import { AppTextService } from "./app-text.service";

// entities
import { AppText } from "./app-text.entity";

// automapper
import { AppTextAutomapper } from "./app-text.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([AppText]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [AppTextController],
  providers: [AppTextService, AppTextAutomapper],
  exports: [AppTextService],
})
export class AppTextModule {}
