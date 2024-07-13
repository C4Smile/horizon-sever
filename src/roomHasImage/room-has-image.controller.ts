import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddRoomHasImageDto } from "./dto/add-room-has-image.dto";

// services
import { RoomHasImageService } from "./room-has-image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomHasImage")
export class RoomHasImageController {
  constructor(private roomHasImageService: RoomHasImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoom: AddRoomHasImageDto) {
    return this.roomHasImageService.create(newRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.roomHasImageService.remove(id);
  }
}
