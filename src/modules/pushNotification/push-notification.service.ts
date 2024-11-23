import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { PushNotification } from "./push-notification.entity";
import { Photo } from "../image/image.entity";

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
    @InjectRepository(Photo) imageService: Repository<Photo>,
  ) {
    const relationships = ["image"];
    super(pushNotificationService, imageService, relationships);
  }

  mappedGet = async (query: QueryFilter): Promise<PagedResult<PushNotificationDto>> => {
    const result = await this.get(query);
    return {
      items: result.items.map((notification) => ({
        ...notification,
        imageId: {
          id: notification.image.id,
          url: notification.image.url,
          fileName: notification.image.fileName,
        },
      })),
      total: result.total,
    };
  };
}
