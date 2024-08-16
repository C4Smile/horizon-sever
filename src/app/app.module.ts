import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { AppController } from "./app.controller";

// service
import { AppService } from "./app.service";

// entities
import { App } from "./app.entity";

// automapper
import { AppAutomapper } from "./app.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([App]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [AppController],
  providers: [AppService, AppAutomapper],
  exports: [AppService, AppAutomapper],
})
export class AppModule {}
96;
