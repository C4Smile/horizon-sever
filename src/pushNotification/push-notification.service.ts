import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { PushNotification } from "./push-notification.entity";

// dto
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
    relationships: string[] = ["image"],
  ) {
    super(pushNotificationService, mapper, relationships);
  }
}
