import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";
import { Repository } from "typeorm";
import { classes } from "@automapper/classes";

// automapper
import { RoomAutomapper } from "./room.automapper";

// controller
import { RoomController } from "./room.controller";

// service
import { RoomService } from "./room.service";

// entity
import { Room } from "./room.entity";

// base
import { CrudService } from "src/models/service/CrudService";

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [RoomController],
  providers: [Repository, Array, CrudService, RoomService, RoomAutomapper],
  exports: [RoomService, RoomAutomapper],
})
export class RoomModule {}
