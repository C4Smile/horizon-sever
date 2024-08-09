import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { Repository } from "typeorm";

// controller
import { ActivityController } from "./activity.controller";

// service
import { ActivityService } from "./activity.service";

// entities
import { Activity } from "./activity.entity";

// automapper
import { ActivityAutomapper } from "./activity.automapper";

// base
import { CrudService } from "src/models/service/CrudService";

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [ActivityController],
  providers: [ActivityAutomapper, Repository, Array, CrudService, ActivityService],
  exports: [ActivityService, ActivityAutomapper],
})
export class ActivityModule {}
