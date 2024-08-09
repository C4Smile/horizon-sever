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
import { RoomType } from "./room-type.entity";

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
  @UseInterceptors(MapInterceptor(RoomType, RoomTypeDto, { isArray: true }))
  get(@Query() query): Promise<RoomTypeDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsRoomTypeService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(RoomType, RoomTypeDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsRoomTypeService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoomType: AddRoomTypeDto) {
    return this.newsRoomTypeService.create(newRoomType);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsRoomTypeService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomTypeDto) {
    return this.newsRoomTypeService.update(id, data);
  }
}
