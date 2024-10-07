import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { Activity } from "./activity.entity";

// utils
import { PagedResult, QueryFilter } from "src/models/types";

// dto
import { ActivityDto } from "./dto/activity.dto";
import { AddActivityDto } from "./dto/add-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { LastActivityDto } from "./dto/LastActivityDto";

// utils
import { filterByTags } from "src/tags/utils";

@Injectable()
export class ActivityService extends CrudService<Activity, AddActivityDto, UpdateActivityDto> {
  constructor(
    @InjectRepository(Activity) activityService: Repository<Activity>,
    @InjectMapper() mapper: Mapper,
  ) {
    const relationships = ["image"];
    super(activityService, mapper, relationships);
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<ActivityDto>> => {
    const result = await this.get(query);
    const mappedItems = await this.mapper.mapArrayAsync(result.items, Activity, ActivityDto);
    return {
      items: mappedItems,
      total: result.total,
    };
  };

  async lasts() {
    const list = await this.entityService.find({
      take: 6,
      relations: this.relationships,
      order: {
        lastUpdate: "ASC",
      },
    });

    return this.mapper.mapArrayAsync(list, Activity, LastActivityDto);
  }

  async list({ sort = "lastUpdate", order = "DESC", page = 0, count = 9, tags = "" }) {
    const list = await this.entityService.find({
      skip: page * count,
      take: count,
      relations: this.relationships,
      order: {
        [sort]: order,
      },
    });

    return this.mapper.mapArrayAsync(filterByTags(list, tags), Activity, LastActivityDto);
  }
}
