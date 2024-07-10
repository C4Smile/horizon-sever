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
import { RoomTypeDto } from "./dto/room-type.dto";
import { AddRoomTypeDto } from "./dto/add-room-type.dto";

// services
import { RoomTypeService } from "./room-type.service";
import { UpdateRoomTypeDto } from "./dto/update-room-type.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomType")
export class RoomTypeController {
  constructor(private newsRoomTypeService: RoomTypeService) {}

  @Get()
  get(@Query() query): Promise<RoomTypeDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.newsRoomTypeService.get({ order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsRoomTypeService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoomType: AddRoomTypeDto) {
    return this.newsRoomTypeService.create(newRoomType);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.newsRoomTypeService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomTypeDto) {
    return this.newsRoomTypeService.update(id, data);
  }
}
