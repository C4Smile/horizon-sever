import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { EventHasSchedule } from "./event-has-schedule.entity";

// dto
import { AddEventHasScheduleDto } from "./dto/add-event-has-schedule.dto";

@Injectable()
export class EventHasScheduleService {
  constructor(
    @InjectRepository(EventHasSchedule) private eventHasScheduleService: Repository<EventHasSchedule>,
  ) {}

  async create(event: AddEventHasScheduleDto) {
    const newEvent = this.eventHasScheduleService.create(event);
    const saved = await this.eventHasScheduleService.save(newEvent);
    return [saved];
  }

  async remove(id: number) {
    const result = await this.eventHasScheduleService.update({ id }, { deleted: true });
    if (result.affected === 0)
      throw new HttpException("Event has schedule not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
