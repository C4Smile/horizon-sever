import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

// dto
import { AddRoomAreaHasImageDto } from "./dto/add-room-area-has-image.dto";

// services
import { RoomAreaHasImageService } from "./room-area-has-image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomAreaHasImage")
export class RoomAreaHasImageController {
  constructor(private roomAreaService: RoomAreaHasImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoomArea: AddRoomAreaHasImageDto) {
    return this.roomAreaService.create(newRoomArea);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() toDelete: number[]) {
    return this.roomAreaService.remove(toDelete);
  }
}
