import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { join } from "path";

// app
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// modules
import { AuthModule } from "./auth/auth.module";
import { HorizonRoleModule } from "./modules/horizonRole/horizon-role.module";
import { HorizonUserModule } from "./modules/horizonUser/horizon-user.module";
import { ImageModule } from "./modules/image/image.module";
import { PushNotificationModule } from "./modules/pushNotification/push-notification.module";
import { ResourceModule } from "./modules/resource/resource.module";
import { UserModule } from "./modules/user/user.module";
import { JobsModule } from "./modules/jobs/JobsModule";
import { GameBasicsModule } from "./modules/game/game.module";
import { BuildingModule } from "./modules/building/building.module";

// config
import config from "./config/configuration";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    JobsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/public/",
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      username: config.db.user,
      password: config.db.password,
      host: config.db.url,
      port: config.db.port,
      database: config.db.name,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AppModule,
    AuthModule,
    HorizonRoleModule,
    HorizonUserModule,
    ImageModule,
    PushNotificationModule,
    UserModule,
    ResourceModule,
    GameBasicsModule,
    BuildingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
