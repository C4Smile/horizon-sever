import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { EventHasImage } from "./event-has-image.entity";

// dto
import { AddEventHasImageDto } from "./dto/add-event-has-image.dto";

@Injectable()
export class EventHasImageService {
  constructor(@InjectRepository(Event) private eventHasImageService: Repository<EventHasImage>) {}

  async create(event: AddEventHasImageDto) {
    const newEvent = this.eventHasImageService.create(event);
    return this.eventHasImageService.save(newEvent);
  }

  async remove(id: number) {
    const result = await this.eventHasImageService.save({ id, deleted: true });
    if (result.affected === 0) throw new HttpException("Event Has Image not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
