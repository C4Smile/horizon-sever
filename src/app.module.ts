import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

// app
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// modules
import { UserModule } from "./user/user.module";
import { RoomModule } from "./room/room.module";
import { AuthModule } from "./auth/auth.module";
import { EventModule } from "./event/event.module";
import { TagModule } from "./tags/tag.module";
import { NewsModule } from "./news/news.module";
import { ExternalLinkModule } from "./externalLink/external-link.module";
import { EventHasLinkModule } from "./eventHasLink/event-has-link.module";
import { EventHasScheduleModule } from "./eventHasSchedule/event-has-schedule.module";
import { AppTextModule } from "./appTexts/app-text.module";
import { RoomAreaModule } from "./room-area/room-area.module";
import { RoomHasScheduleModule } from "./roomHasSchedule/room-has-schedule.module";
import { RoomStatusModule } from "./roomStatus/room-status.module";
import { RoomTypeModule } from "./roomType/room-type.module";
import { ActivityModule } from "./activity/activity.module";
import { MuseumRoleModule } from "./museumRole/museum-role.module";
import { MuseumUserModule } from "./museumUser/museum-user.module";
import { PushNotificationModule } from "./pushNotification/push-notification.module";
import { ServiceModule } from "./service/service.module";
import { ServiceHasScheduleModule } from "./serviceHasSchedule/service-has-schedule.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),

    TypeOrmModule.forRoot({
      type: "mysql",
      username: "root",
      password: "",
      host: "localhost",
      port: 3306,
      database: "museo",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ActivityModule,
    AuthModule,
    AppTextModule,
    EventModule,
    EventHasLinkModule,
    EventHasScheduleModule,
    ExternalLinkModule,
    MuseumRoleModule,
    MuseumUserModule,
    NewsModule,
    PushNotificationModule,
    RoomAreaModule,
    RoomModule,
    RoomHasScheduleModule,
    RoomStatusModule,
    RoomTypeModule,
    TagModule,
    ServiceHasScheduleModule,
    ServiceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
