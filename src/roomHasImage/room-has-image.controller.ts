import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

// dto
import { AddRoomHasImageDto } from "./dto/add-room-has-image.dto";

// services
import { RoomHasImageService } from "./room-has-image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomHasImage")
export class RoomHasImageController {
  constructor(private roomService: RoomHasImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoom: AddRoomHasImageDto) {
    return this.roomService.create(newRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() toDelete: number[]) {
    return this.roomService.remove(toDelete);
  }
}
