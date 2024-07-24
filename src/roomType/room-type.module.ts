import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// automapper
import { RoomTypeAutomapper } from "./room-type.automapper";

// controller
import { RoomTypeController } from "./room-type.controller";

// service
import { RoomTypeService } from "./room-type.service";

// entities
import { RoomType } from "./room-type.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomType]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [RoomTypeController],
  providers: [RoomTypeService, RoomTypeAutomapper],
  exports: [RoomTypeService, RoomTypeAutomapper],
})
export class RoomTypeModule {}
