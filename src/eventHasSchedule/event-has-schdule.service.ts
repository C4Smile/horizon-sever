import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { EventHasSchedule } from "./event-has-schedule.entity";

// dto
import { AddEventHasScheduleDto } from "./dto/add-event-has-schedule.dto";

@Injectable()
export class EventHasScheduleService {
  constructor(@InjectRepository(Event) private eventHasScheduleService: Repository<EventHasSchedule>) {}

  async create(event: AddEventHasScheduleDto) {
    const newEvent = this.eventHasScheduleService.create(event);
    return this.eventHasScheduleService.save(newEvent);
  }

  async remove(scheduleId: number) {
    const result = await this.eventHasScheduleService.delete({ scheduleId });
    if (result.affected === 0)
      throw new HttpException("Event has schedule not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
