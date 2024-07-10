import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddEventHasScheduleDto } from "./dto/add-event-has-schedule.dto";

// services
import { EventHasScheduleService } from "./event-has-schedule.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("eventHasSchedule")
export class EventHasScheduleController {
  constructor(private eventHasScheduleService: EventHasScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newEvent: AddEventHasScheduleDto) {
    return this.eventHasScheduleService.create(newEvent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.eventHasScheduleService.remove(id);
  }
}
