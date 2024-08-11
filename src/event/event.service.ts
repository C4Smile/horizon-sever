import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { Event } from "./event.entity";

// utils
import { QueryFilter, PagedResult } from "src/models/types";

// dto
import { EventDto } from "./dto/event.dto";
import { AddEventDto } from "./dto/add-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService extends CrudService<Event, AddEventDto, UpdateEventDto> {
  constructor(
    @InjectRepository(Event) eventService: Repository<Event>,
    @InjectMapper() mapper: Mapper,
  ) {
    const relationships = [/* "eventHasLink", */ "eventHasTag", "eventHasImage"];
    super(eventService, mapper, relationships);
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<EventDto>> => {
    const result = await this.get(query);
    const mappedItems = await this.mapper.mapArrayAsync(result.items, Event, EventDto);
    return {
      items: mappedItems,
      total: result.total,
    };
  };
}
