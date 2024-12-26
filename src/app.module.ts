import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";

import { join } from "path";

// app
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// modules
import { AuthModule } from "./auth/auth.module";
import { AppsModule } from "./modules/app/app.module";
import { AppTextModule } from "./modules/appTexts/app-text.module";
import { AppTranslationModule } from "./modules/appTranslation/app-translation.module";
import { BuildingModule } from "./modules/building/building.module";
import { BuildingCostModule } from "./modules/buildingCost/building-cost.module";
import { BuildingReqTechModule } from "./modules/buildingReqTech/building-req-tech.module";
import { BuildingTypeModule } from "./modules/buildingType/building-type.module";
import { BuildingUpkeepModule } from "./modules/buildingUpkeep/building-upkeep.module";
import { BuildingProducesModule } from "./modules/buildingProduces/building-produces.module";
import { BuildingReqBuildingModule } from "./modules/buildingReqBuilding/building-req-building.module";
import { HorizonRoleModule } from "./modules/horizonRole/horizon-role.module";
import { HorizonUserModule } from "./modules/horizonUser/horizon-user.module";
import { ImageModule } from "./modules/image/image.module";
import { LangsModule } from "./modules/lang/lang.module";
import { LangTranslationModule } from "./modules/langTranslation/lang-translation.module";
import { PushNotificationModule } from "./modules/pushNotification/push-notification.module";
import { ResourceModule } from "./modules/resource/resource.module";
import { TechModule } from "./modules/tech/tech.module";
import { TechCostModule } from "./modules/techCost/tech-cost.module";
import { TechProducesModule } from "./modules/techProduces/tech-produces.module";
import { TechReqBuildingModule } from "./modules/techReqBuilding/tech-req-building.module";
import { TechReqTechModule } from "./modules/techReqTech/tech-req-tech.module";
import { TechTypeModule } from "./modules/techType/tech-type.module";
import { UserModule } from "./modules/user/user.module";
import { SkillModule } from "./modules/skills/skill.module";
import { ShipModule } from "./modules/ship/ship.module";
import { ShipCostModule } from "./modules/shipCost/ship-cost.module";
import { ShipReqBuildingModule } from "./modules/shipReqBuilding/ship-req-building.module";
import { ShipReqTechModule } from "./modules/shipReqTech/ship-req-tech.module";
import { ShipUpkeepModule } from "./modules/shipUpkeep/ship-upkeep.module";
import { CannonModule } from "./modules/cannon/cannon.module";
import { CannonCostModule } from "./modules/cannonCost/cannon-cost.module";
import { CannonReqTechModule } from "./modules/cannonReqTech/cannon-req-tech.module";
import { CannonReqBuildingModule } from "./modules/cannonReqBuilding/cannon-req-building.module";
import { GameBasicsModule } from "./modules/game/game.module";

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
    BuildingTypeModule,
    BuildingModule,
    BuildingCostModule,
    BuildingReqTechModule,
    BuildingReqBuildingModule,
    BuildingUpkeepModule,
    BuildingProducesModule,
    ResourceModule,
    TechModule,
    TechCostModule,
    TechProducesModule,
    TechReqTechModule,
    TechReqBuildingModule,
    TechTypeModule,
    SkillModule,
    ShipModule,
    ShipCostModule,
    ShipUpkeepModule,
    ShipReqBuildingModule,
    ShipReqTechModule,
    CannonModule,
    CannonCostModule,
    CannonReqTechModule,
    CannonReqBuildingModule,
    GameBasicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
