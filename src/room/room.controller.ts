import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { RoomDto } from "./dto/room.dto";
import { AddRoomDto } from "./dto/add-room.dto";

// services
import { RoomService } from "./room.service";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Controller("room")
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  get(): Promise<RoomDto[]> {
    return this.roomService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomService.getById(id);
  }

  @Post()
  create(@Body() newRoom: AddRoomDto) {
    return this.roomService.create(newRoom);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.roomService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomDto) {
    return this.update(id, data);
  }
}
