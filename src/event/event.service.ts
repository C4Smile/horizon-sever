import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Event } from "./event.entity";

// dto
import { AddEventDto } from "./dto/add-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService {
  constructor(@InjectRepository(Event) private eventService: Repository<Event>) {}

  async create(event: AddEventDto) {
    const eventFound = await this.eventService.findOne({
      where: { title: event.title },
    });

    if (eventFound) throw new HttpException("Event already exists", HttpStatus.CONFLICT);

    const newEvent = this.eventService.create(event);
    return this.eventService.save(newEvent);
  }

  async get({ order, page, count }) {
    const queryBuilder = this.eventService.createQueryBuilder("events");
    queryBuilder
      .orderBy(order)
      .where({ deleted: false })
      .skip(page * count)
      .take((page + 1) * count);
    const list = await queryBuilder.getRawAndEntities();
    return list.entities;
  }

  async getById(id: number) {
    const eventFound = await this.eventService.findOne({
      where: {
        id,
      },
    });

    if (!eventFound) throw new HttpException("Event not Found", HttpStatus.NOT_FOUND);

    return eventFound;
  }

  async remove(id: number) {
    const result = await this.eventService.delete({ id });
    if (result.affected === 0) throw new HttpException("Event not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateEventDto) {
    const eventFound = await this.eventService.findOne({
      where: {
        id,
      },
    });

    if (!eventFound) throw new HttpException("Event not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.eventService.findOne({
      where: {
        title: data.title,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("Event already exists", HttpStatus.CONFLICT);

    const updatedEvent = Object.assign(eventFound, data);

    return this.eventService.save(updatedEvent);
  }
}
