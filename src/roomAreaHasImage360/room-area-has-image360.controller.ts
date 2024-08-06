import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

// dto
import { AddRoomAreaHasImage360Dto } from "./dto/add-room-area-has-image360.dto";

// services
import { RoomAreaHasImage360Service } from "./room-area-has-image360.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomAreaHasImage360")
export class RoomAreaHasImage360Controller {
  constructor(private roomAreaService: RoomAreaHasImage360Service) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoom: AddRoomAreaHasImage360Dto) {
    return this.roomAreaService.create(newRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() toDelete: number[]) {
    return this.roomAreaService.remove(toDelete);
  }
}
