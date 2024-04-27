import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

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

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<EventDto[]> {
    return this.eventService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.eventService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEvent: AddEventDto) {
    return this.eventService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.eventService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateEventDto) {
    return this.eventService.update(id, data);
  }
}
