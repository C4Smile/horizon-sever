import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { PushNotificationController } from "./push-notification.controller";

// service
import { PushNotificationService } from "./push-notification.service";

// entities
import { PushNotification } from "./push-notification.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PushNotification])],
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
