import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddRoomHasScheduleDto } from "./dto/add-room-has-schedule.dto";

// services
import { RoomHasScheduleService } from "./room-has-schedule.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomHasSchedule")
export class RoomHasScheduleController {
  constructor(private roomHasScheduleService: RoomHasScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoom: AddRoomHasScheduleDto) {
    return this.roomHasScheduleService.create(newRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.roomHasScheduleService.remove(id);
  }
}
