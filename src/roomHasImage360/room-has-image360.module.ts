import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { RoomHasImage360Controller } from "./room-has-image360.controller";

// service
import { RoomHasImage360Service } from "./room-has-image360.service";

// entity
import { RoomHasImage360 } from "./room-has-image360.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomHasImage360])],
  controllers: [RoomHasImage360Controller],
  providers: [RoomHasImage360Service],
  exports: [RoomHasImage360Service],
})
export class RoomHasImage360Module {}
