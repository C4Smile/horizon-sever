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
import { BuildingCostsModule } from "./modules/buildingCosts/building-costs.module";
import { BuildingUpkeepModule } from "./modules/buildingUpkeep/building-upkeep.module";
import { BuildingReqTechModule } from "./modules/buildingReqTech/building-req-tech.module";
import { BuildingModule } from "./modules/building/building.module";
import { TechTypeModule } from "./modules/techType/tech-type.module";
import { TechModule } from "./modules/tech/tech.module";
import { TechCostsModule } from "./modules/techCosts/tech-costs.module";
import { TechProducesModule } from "./modules/techProduces/tech-produces.module";
import { TechReqTechModule } from "./modules/techReqTechs/tech-req-tech.module";
import { TechReqBuildingModule } from "./modules/techReqBuilding/tech-req-building.module";
import { ResourceModule } from "./modules/resource/resource.module";

// config
import config from "./config/configuration";

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
    BuildingCostsModule,
    BuildingReqTechModule,
    BuildingUpkeepModule,
    ResourceModule,
    TechModule,
    TechCostsModule,
    TechProducesModule,
    TechReqTechModule,
    TechReqBuildingModule,
    TechTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
