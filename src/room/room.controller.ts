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
  @UseInterceptors(MapInterceptor(Room, RoomDto, { isArray: true }))
  get(@Query() query) {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.roomService.get({ sort, order, page, count });
  }

  @Get("home-slider")
  @UseInterceptors(MapInterceptor(Room, RoomDto, { isArray: true }))
  getHomeSlider(): Promise<RoomHomeDto[]> {
    return this.roomService.getHomeSlider();
  }

  @Get("gallery")
  getForGallery(@Query() query): Promise<RoomGalleryDto[]> {
    const { count = 20 } = query;
    return this.roomService.getForGallery({ count });
  }

  @Get("details/:slug")
  getDetailsBySlug(@Param("slug") slug: string) {
    return this.roomService.getDetailsBySlug(slug);
  }

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
  @Delete()
  remove(@Body() ids: number[]) {
    return this.roomService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomDto) {
    return this.roomService.update(id, data);
  }
}
