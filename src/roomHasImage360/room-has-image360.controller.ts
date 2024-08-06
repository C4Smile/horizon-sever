import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

// dto
import { AddRoomHasImage360Dto } from "./dto/add-room-has-image360.dto";

// services
import { RoomHasImage360Service } from "./room-has-image360.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomHasImage360")
export class RoomHasImage360Controller {
  constructor(private roomHasImage360Service: RoomHasImage360Service) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoom: AddRoomHasImage360Dto) {
    return this.roomHasImage360Service.create(newRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() toDelete: number[]) {
    return this.roomHasImage360Service.remove(toDelete);
  }
}
