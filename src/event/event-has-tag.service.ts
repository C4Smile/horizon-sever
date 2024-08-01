import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { EventHasTag } from "./event-has-.entity";

// dto
import { AddEventHasTagDto } from "./dto/add-event-has-tag.dto";

@Injectable()
export class EventHasTagService {
  constructor(@InjectRepository(EventHasTag) private eventHasTagService: Repository<EventHasTag>) {}

  async create(eventHasTag: AddEventHasTagDto) {
    const newEventHasTag = this.eventHasTagService.create(eventHasTag);
    const saved = await this.eventHasTagService.save(newEventHasTag);
    return [saved];
  }

  async remove(eventHasTag: AddEventHasTagDto) {
    const result = await this.eventHasTagService.delete({
      eventId: eventHasTag.eventId,
      tagId: eventHasTag.tagId,
    });
    if (result.affected === 0) throw new HttpException("Event not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
