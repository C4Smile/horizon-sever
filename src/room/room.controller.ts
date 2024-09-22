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
import { Room } from "./room.entity";

// utils
import { PagedResult, QueryFilter } from "src/models/types";

// dto
import { RoomDto } from "./dto/room.dto";
import { AddRoomDto } from "./dto/add-room.dto";
import { RoomHomeDto } from "./dto/room-home.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { RoomGalleryDto } from "./dto/room-gallery.dto";

// services
import { RoomService } from "./room.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("room")
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  get(@Query() query: QueryFilter): Promise<PagedResult<RoomDto>> {
    return this.roomService.mappedGet(query);
  }

  @Get("home-slider")
  @UseInterceptors(MapInterceptor(Room, RoomDto, { isArray: true }))
  getHomeSlider(@Query() query): Promise<RoomHomeDto[]> {
    const { type } = query;
    return this.roomService.getHomeSlider(type);
  }

  @Get("gallery")
  getForGallery(@Query() query): Promise<RoomGalleryDto[]> {
    const { count = 20, type } = query;
    return this.roomService.getForGallery({ count }, type);
  }

  @Get("details/:slug")
  getDetailsBySlug(@Param("slug") slug: string) {
    return this.roomService.getDetailsBySlug(slug);
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(Room, RoomDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoom: AddRoomDto) {
    return this.roomService.create(newRoom);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.roomService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.roomService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomDto) {
    return this.roomService.update(id, data);
  }
}
