import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, type Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";

// entity
import { PushNotification } from "./push-notification.entity";

// dto
import { PushNotificationDto } from "./dto/push-notification.dto";

@Injectable()
export class PushNotificationAutomapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, PushNotification, PushNotificationDto);
    };
  }
}
