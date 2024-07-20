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
import { RoomStatusDto } from "./dto/room-status.dto";
import { AddRoomStatusDto } from "./dto/add-room-status.dto";

// services
import { RoomStatusService } from "./room-status.service";
import { UpdateRoomStatusDto } from "./dto/update-room-status.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomStatus")
export class RoomStatusController {
  constructor(private newsRoomStatusService: RoomStatusService) {}

  @Get()
  get(@Query() query): Promise<RoomStatusDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsRoomStatusService.get({ sort, order, page, count });
  }

   @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsRoomStatusService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoomStatus: AddRoomStatusDto) {
    return this.newsRoomStatusService.create(newRoomStatus);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.newsRoomStatusService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomStatusDto) {
    return this.newsRoomStatusService.update(id, data);
  }
}
