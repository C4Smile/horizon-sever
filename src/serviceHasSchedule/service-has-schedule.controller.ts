import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddServiceHasScheduleDto } from "./dto/add-service-has-schedule.dto";

// services
import { ServiceHasScheduleService } from "./service-has-schedule.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("serviceHasSchedule")
export class ServiceHasScheduleController {
  constructor(private serviceHasScheduleService: ServiceHasScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newService: AddServiceHasScheduleDto) {
    return this.serviceHasScheduleService.create(newService);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.serviceHasScheduleService.remove(id);
  }
}
