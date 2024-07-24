import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { RoomStatusController } from "./room-status.controller";

// service
import { RoomStatusService } from "./room-status.service";

// entities
import { RoomStatus } from "./room-status.entity";

// automapper
import { RoomStatusAutomapper } from "./room-status.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomStatus]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [RoomStatusController],
  providers: [RoomStatusService, RoomStatusAutomapper],
  exports: [RoomStatusService, RoomStatusAutomapper],
})
export class RoomStatusModule {}
96;
