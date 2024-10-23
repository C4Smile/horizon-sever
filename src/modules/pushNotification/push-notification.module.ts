import { Module } from "@nestjs/common";
import { Repository } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { PushNotificationController } from "./push-notification.controller";

// service
import { PushNotificationService } from "./push-notification.service";

// entities
import { PushNotification } from "./push-notification.entity";

// base
import { CrudService } from "src/modules/models/service/CrudService";

@Module({
  imports: [TypeOrmModule.forFeature([PushNotification])],
  controllers: [PushNotificationController],
  providers: [Repository, Array, CrudService, PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
