import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { RoomStatusController } from "./room-status.controller";

// service
import { RoomStatusService } from "./room-status.service";

// entities
import { RoomStatus } from "./room-status.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomStatus])],
  controllers: [RoomStatusController],
  providers: [RoomStatusService],
  exports: [RoomStatusService],
})
export class RoomStatusModule {}
