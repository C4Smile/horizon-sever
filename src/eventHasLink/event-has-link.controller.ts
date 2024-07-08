import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddEventHasLinkDto } from "./dto/add-event-has-link.dto";

// services
import { EventHasLinkService } from "./event-has-link.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("eventHasLink")
export class EventHasLinkController {
  constructor(private eventHasLinkService: EventHasLinkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEvent: AddEventHasLinkDto) {
    return this.eventHasLinkService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.eventHasLinkService.remove(id);
  }
}
