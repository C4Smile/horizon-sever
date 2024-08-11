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
  UseInterceptors,
} from "@nestjs/common";
import { MapInterceptor } from "@automapper/nestjs";

// entity
import { RoomStatus } from "./room-status.entity";

// utils
import { PagedResult } from "src/models/types";

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
  constructor(private roomStatusService: RoomStatusService) {}

  @Get()
  @UseInterceptors(MapInterceptor(RoomStatus, RoomStatusDto, { isArray: true }))
  get(@Query() query): Promise<PagedResult<RoomStatusDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.roomStatusService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(RoomStatus, RoomStatusDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomStatusService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoomStatus: AddRoomStatusDto) {
    return this.roomStatusService.create(newRoomStatus);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.roomStatusService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.roomStatusService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomStatusDto) {
    return this.roomStatusService.update(id, data);
  }
}
