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
import { EventTagDto } from "./dto/event-tag.dto";
import { AddEventTagDto } from "./dto/add-event-tag.dto";

// services
import { EventTagService } from "./event-tag.service";
import { UpdateEventTagDto } from "./dto/update-event-tag.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("event-tag")
export class EventTagController {
  constructor(private eventTagService: EventTagService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<EventTagDto[]> {
    return this.eventTagService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.eventTagService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEventTag: AddEventTagDto) {
    return this.eventTagService.create(newEventTag);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.eventTagService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateEventTagDto) {
    return this.eventTagService.update(id, data);
  }
}
