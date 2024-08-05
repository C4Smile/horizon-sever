import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

// dto
import { AddEventHasImageDto } from "./dto/add-event-has-image.dto";

// services
import { EventHasImageService } from "./event-has-image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("eventHasImage")
export class EventHasImageController {
  constructor(private eventService: EventHasImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEvent: AddEventHasImageDto) {
    return this.eventService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() toDelete: number[]) {
    return this.eventService.remove(toDelete);
  }
}
