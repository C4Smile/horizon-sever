import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { EventTag } from "./event-tag.entity";

// dto
import { AddEventTagDto } from "./dto/add-event-tag.dto";
import { UpdateEventTagDto } from "./dto/update-event-tag.dto";

@Injectable()
export class EventTagService {
  constructor(@InjectRepository(EventTag) private countryService: Repository<EventTag>) {}

  async create(country: AddEventTagDto) {
    const countryFound = await this.countryService.findOne({
      where: { name: country.name },
    });

    if (countryFound) throw new HttpException("EventTag already exists", HttpStatus.CONFLICT);

    const newEventTag = this.countryService.create(country);
    return this.countryService.save(newEventTag);
  }

  get() {
    return this.countryService.find();
  }

  async getById(id: number) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) throw new HttpException("EventTag not Found", HttpStatus.NOT_FOUND);

    return countryFound;
  }

  async remove(id: number) {
    const result = await this.countryService.delete({ id });
    if (result.affected === 0) throw new HttpException("EventTag not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateEventTagDto) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) throw new HttpException("EventTag not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.countryService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("EventTag already exists", HttpStatus.CONFLICT);

    const updatedEventTag = Object.assign(countryFound, data);

    return this.countryService.save(updatedEventTag);
  }
}
