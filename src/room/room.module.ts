import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// automapper
import { RoomAutomapper } from "./room.automapper";

// controller
import { RoomController } from "./room.controller";

// service
import { RoomService } from "./room.service";

// entity
import { Room } from "./room.entity";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomAutomapper],
  exports: [RoomService],
})
export class RoomModule {}
