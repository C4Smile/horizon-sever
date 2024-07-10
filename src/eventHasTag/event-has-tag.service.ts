import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { EventHasTag } from "./event-has-tag.entity";

// dto
import { AddEventHasTagDto } from "./dto/add-event-has-tag.dto";

@Injectable()
export class EventHasTagService {
  constructor(@InjectRepository(EventHasTag) private eventHasTagService: Repository<EventHasTag>) {}

  async create(event: AddEventHasTagDto) {
    const newEvent = this.eventHasTagService.create(event);
    return this.eventHasTagService.save(newEvent);
  }

  async remove(tagId: number) {
    const result = await this.eventHasTagService.delete({ tagId });
    if (result.affected === 0) throw new HttpException("Event has tag not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
