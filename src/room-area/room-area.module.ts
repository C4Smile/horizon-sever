import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

// automapper
import { RoomAreaAutomapper } from "./room-area.automapper";

// controller
import { RoomAreaController } from "./room-area.controller";

// service
import { RoomAreaService } from "./room-area.service";

// entities
import { RoomArea } from "./room-area.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomArea]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [RoomAreaController],
  providers: [RoomAreaService, RoomAreaAutomapper],
  exports: [RoomAreaService, RoomAreaAutomapper],
})
export class RoomAreaModule {}
