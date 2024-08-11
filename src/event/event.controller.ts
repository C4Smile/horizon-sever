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
import { Event } from "./event.entity";

// utils
import { PagedResult, QueryFilter } from "src/models/types";

// dto
import { EventDto } from "./dto/event.dto";
import { AddEventDto } from "./dto/add-event.dto";

// services
import { EventService } from "./event.service";
import { UpdateEventDto } from "./dto/update-event.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("event")
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  get(@Query() query: QueryFilter): Promise<PagedResult<EventDto>> {
    return this.eventService.mappedGet(query);
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(Event, EventDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.eventService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEvent: AddEventDto) {
    return this.eventService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.eventService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.eventService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateEventDto) {
    return this.eventService.update(id, data);
  }
}
