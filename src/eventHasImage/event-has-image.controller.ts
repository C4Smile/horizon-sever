import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddEventHasImageDto } from "./dto/add-event-has-image.dto";

// services
import { EventHasImageService } from "./event-has-image.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("eventHasImage")
export class EventHasImageController {
  constructor(private eventHasImageService: EventHasImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEvent: AddEventHasImageDto) {
    return this.eventHasImageService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.eventHasImageService.remove(id);
  }
}
