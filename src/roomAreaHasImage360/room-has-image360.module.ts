import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { RoomAreaHasImage360Controller } from "./room-area-has-image360.controller";

// service
import { RoomAreaHasImage360Service } from "./room-has-image360.service";

// entity
import { RoomAreaHasImage360 } from "./room-area-has-image360.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomAreaHasImage360])],
  controllers: [RoomAreaHasImage360Controller],
  providers: [RoomAreaHasImage360Service],
  exports: [RoomAreaHasImage360Service],
})
export class RoomAreaHasImage360Module {}
