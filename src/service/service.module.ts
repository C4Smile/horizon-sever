import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { ServiceController } from "./service.controller";

// service
import { ServiceService } from "./service.service";

// entities
import { Service } from "./service.entity";

// automapper
import { ServiceAutomapper } from "./service.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceAutomapper],
  exports: [ServiceService],
})
export class ServiceModule {}
