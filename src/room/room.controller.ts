import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

// dto
import { RoomDto } from "./dto/room.dto";
import { AddRoomDto } from "./dto/add-room.dto";

// services
import { RoomService } from "./room.service";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("room")
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<RoomDto[]> {
    return this.roomService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoom: AddRoomDto) {
    return this.roomService.create(newRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.roomService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomDto) {
    return this.update(id, data);
  }
}
