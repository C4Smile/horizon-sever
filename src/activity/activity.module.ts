import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { ActivityController } from "./activity.controller";

// service
import { ActivityService } from "./activity.service";

// entities
import { Activity } from "./activity.entity";

// automapper
import { ActivityAutomapper } from "./activity.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityAutomapper],
  exports: [ActivityService],
})
export class ActivityModule {}
