import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { MapInterceptor } from "@automapper/nestjs";

// entity
import { RoomArea } from "./room-area.entity";

// dto
import { RoomAreaDto } from "./dto/room-area.dto";
import { AddRoomAreaDto } from "./dto/add-room-area.dto";
import { UpdateRoomAreaDto } from "./dto/update-room-area.dto";
import { UpdateRoomAreaOrderDto } from "./dto/update-room-area-order.dto";

// services
import { RoomAreaService } from "./room-area.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("roomArea")
export class RoomAreaController {
  constructor(private roomAreaService: RoomAreaService) {}

  @Get()
  @UseInterceptors(MapInterceptor(RoomArea, RoomAreaDto, { isArray: true }))
  get(@Query() query): Promise<RoomAreaDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.roomAreaService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(RoomArea, RoomAreaDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.roomAreaService.getById(id);
  }

  @Get("byRoomId/:id")
  getByRoomId(@Param("id", ParseIntPipe) id: number, @Query() query) {
    const { sort = "number", order = "ASC", page = 0, count = 999 } = query;
    return this.roomAreaService.getByRoomId({ roomId: id, sort, order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newRoomArea: AddRoomAreaDto) {
    return this.roomAreaService.create(newRoomArea);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.roomAreaService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.roomAreaService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateRoomAreaDto) {
    return this.roomAreaService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put("order")
  order(@Body() roomAreas: UpdateRoomAreaOrderDto[]) {
    return this.roomAreaService.saveOrder(roomAreas);
  }
}
