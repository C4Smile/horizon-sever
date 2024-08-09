import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { Repository } from "typeorm";

// automapper
import { RoomAreaAutomapper } from "./room-area.automapper";

// controller
import { RoomAreaController } from "./room-area.controller";

// service
import { RoomAreaService } from "./room-area.service";

// entities
import { RoomArea } from "./room-area.entity";

// base
import { CrudService } from "src/models/service/CrudService";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomArea]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [RoomAreaController],
  providers: [Repository, Array, CrudService, RoomAreaService, RoomAreaAutomapper],
  exports: [RoomAreaService, RoomAreaAutomapper],
})
export class RoomAreaModule {}
