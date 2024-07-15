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
import { EventHasImageModule } from "./eventHasImage/event-has-image.module";
import { ExternalLinkModule } from "./externalLink/external-link.module";
import { EventHasLinkModule } from "./eventHasLink/event-has-link.module";
import { EventHasScheduleModule } from "./eventHasSchedule/event-has-schedule.module";
import { EventHasTagModule } from "./eventHasTag/event-has-tag.module";
import { AppTextModule } from "./appTexts/app-text.module";
import { NewsHasTagModule } from "./newsHasTag/news-has-tag.module";
import { NewsHasImageModule } from "./newsHasImage/news-has-image.module";
import { RoomStatusModule } from "./roomStatus/room-status.module";
import { RoomTypeModule } from "./roomType/room-type.module";
import { ActivityModule } from "./activity/activity.module";
import { MuseumRoleModule } from "./museumRole/museum-role.module";
import { MuseumUserModule } from "./museumUser/museum-user.module";
import { PushNotificationModule } from "./pushNotification/push-notification.module";
import { RoomHasImage360Module } from "./roomHasImage360/room-has-image360.module";
import { RoomHasImageModule } from "./roomHasImage/room-has-image.module";
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
      synchronize: false,
    }),
    ActivityModule,
    AuthModule,
    AppTextModule,
    EventModule,
    EventHasImageModule,
    EventHasLinkModule,
    EventHasScheduleModule,
    EventHasTagModule,
    ExternalLinkModule,
    MuseumRoleModule,
    MuseumUserModule,
    NewsModule,
    NewsHasImageModule,
    NewsHasTagModule,
    PushNotificationModule,
    RoomModule,
    RoomHasImageModule,
    RoomHasImage360Module,
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
