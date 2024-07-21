import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

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
  create(@Body() newEventHasTag: AddEventHasTagDto) {
    return this.eventHasTagService.create(newEventHasTag);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Body() eventHasTag: AddEventHasTagDto) {
    return this.eventHasTagService.remove(eventHasTag);
  }
}
