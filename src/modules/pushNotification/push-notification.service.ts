import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { PushNotification } from "./push-notification.entity";

// utils
import { QueryFilter, PagedResult } from "src/modules/models/types";

// dto
import { PushNotificationDto } from "./dto/push-notification.dto";
import { AddPushNotificationDto } from "./dto/add-push-notification.dto";
import { UpdatePushNotificationDto } from "./dto/update-push-notification.dto";

@Injectable()
export class PushNotificationService extends CrudService<
  PushNotification,
  AddPushNotificationDto,
  UpdatePushNotificationDto
> {
  constructor(
    @InjectRepository(PushNotification) pushNotificationService: Repository<PushNotification>,
    @InjectMapper() mapper: Mapper,
  ) {
    const relationships = ["image"];
    super(pushNotificationService, mapper, relationships);
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<PushNotificationDto>> => {
    const result = await this.get(query);
    const mappedItems = await this.mapper.mapArrayAsync(
      result.items,
      PushNotification,
      PushNotificationDto,
    );
    return {
      items: mappedItems,
      total: result.total,
    };
  };
}
