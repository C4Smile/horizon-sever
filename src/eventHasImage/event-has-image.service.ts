import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { EventHasImage } from "./event-has-image.entity";

// dto
import { AddEventHasImageDto } from "./dto/add-event-has-image.dto";

@Injectable()
export class EventHasImageService {
  constructor(@InjectRepository(EventHasImage) private eventService: Repository<EventHasImage>) {}

  async create(event: AddEventHasImageDto) {
    const newEvent = this.eventService.create(event);
    const saved = await this.eventService.save(newEvent);
    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.eventService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("Event Has Image not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
