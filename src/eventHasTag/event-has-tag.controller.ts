import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddEventHasTagDto } from "./dto/add-event-has-tag.dto";

// services
import { EventHasTagService } from "./event-has-tag.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("eventHasTag")
export class EventHasTagController {
  constructor(private eventHasTagService: EventHasTagService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEvent: AddEventHasTagDto) {
    return this.eventHasTagService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.eventHasTagService.remove(id);
  }
}
