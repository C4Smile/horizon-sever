import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { EventHasLink } from "./event-has-link.entity";

// dto
import { AddEventHasLinkDto } from "./dto/add-event-has-link.dto";

@Injectable()
export class EventHasLinkService {
  constructor(@InjectRepository(EventHasLink) private eventHasLinkService: Repository<EventHasLink>) {}

  async create(event: AddEventHasLinkDto) {
    const newEvent = this.eventHasLinkService.create(event);
    return [this.eventHasLinkService.save(newEvent)];
  }

  async remove(linkId: number) {
    const result = await this.eventHasLinkService.delete({ linkId });
    if (result.affected === 0)
      throw new HttpException("Event has link not Found", HttpStatus.NOT_FOUND);
    return result;
  }
}
