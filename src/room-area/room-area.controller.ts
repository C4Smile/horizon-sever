import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

// dto
import { RoomAreaDto } from "./dto/room-area.dto";
import { AddRoomAreaDto } from "./dto/add-room-area.dto";

// services
import { RoomAreaService } from "./room-area.service";
import { UpdateRoomAreaDto } from "./dto/update-room-area.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomArea")
export class RoomAreaController {
  constructor(private roomAreaService: RoomAreaService) {}

  @Get()
  get(@Query() query): Promise<RoomAreaDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.roomAreaService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomAreaService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoomArea: AddRoomAreaDto) {
    return this.roomAreaService.create(newRoomArea);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.roomAreaService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomAreaDto) {
    return this.roomAreaService.update(id, data);
  }
}
