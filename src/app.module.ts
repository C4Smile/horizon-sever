import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";

import { join } from "path";

// app
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// modules
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./auth/auth.module";
import { AppTextModule } from "./modules/appTexts/app-text.module";
import { HorizonRoleModule } from "./modules/horizonRole/horizon-role.module";
import { HorizonUserModule } from "./modules/horizonUser/horizon-user.module";
import { PushNotificationModule } from "./modules/pushNotification/push-notification.module";
import { ImageModule } from "./modules/image/image.module";
import { AppTranslationModule } from "./modules/appTranslation/app-translation.module";
import { AppsModule } from "./modules/app/app.module";
import { LangsModule } from "./modules/lang/lang.module";
import { LangTranslationModule } from "./modules/langTranslation/lang-translation.module";
import { BuildingCostModule } from "./modules/buildingCost/building-cost.module";
import { BuildingUpkeepModule } from "./modules/buildingUpkeep/building-upkeep.module";
import { BuildingTechReqModule } from "./modules/buildingTechReq/building-tech-req.module";
import { BuildingModule } from "./modules/building/building.module";

// config
import config from "./config/configuration";
import { ResourceModule } from "./modules/resource/resource.module";

@Module({
  imports: [
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
    AppsModule,
    AppTranslationModule,
    AuthModule,
    AppTextModule,
    HorizonRoleModule,
    HorizonUserModule,
    ImageModule,
    LangsModule,
    LangTranslationModule,
    PushNotificationModule,
    UserModule,
    BuildingModule,
    BuildingCostModule,
    BuildingTechReqModule,
    BuildingUpkeepModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
