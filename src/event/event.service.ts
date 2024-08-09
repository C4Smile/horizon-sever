import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { Event } from "./event.entity";

// dto
import { AddEventDto } from "./dto/add-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService extends CrudService<Event, AddEventDto, UpdateEventDto> {
  constructor(
    @InjectRepository(Event) eventService: Repository<Event>,
    @InjectMapper() mapper: Mapper,
    relationships: string[] = ["eventHasLink", "eventHasTag", "eventHasImage"],
  ) {
    super(eventService, mapper, relationships);
  }
}
