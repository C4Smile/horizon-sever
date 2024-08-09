import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { Activity } from "./activity.entity";

// dto
import { AddActivityDto } from "./dto/add-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";

@Injectable()
export class ActivityService extends CrudService<Activity, AddActivityDto, UpdateActivityDto> {
  constructor(
    @InjectRepository(Activity) activityService: Repository<Activity>,
    @InjectMapper() mapper: Mapper,
    relationships: string[] = ["image"],
  ) {
    super(activityService, mapper, relationships);
  }
}
