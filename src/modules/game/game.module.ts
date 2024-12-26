import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { BuildingProduces } from "../buildingProduces/entities/building-produces.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Building } from "../building/entities/building.entity";
import { BuildingCost } from "../buildingCost/entities/building-cost.entity";
import { BuildingReqBuilding } from "../buildingReqBuilding/entities/building-req-building.entity";
import { Resource } from "../resource/entities/resource.entity";
import { BuildingReqTech } from "../buildingReqTech/entities/building-req-tech.entity";
import { BuildingType } from "../buildingType/entities/building-type.entity";
import { BuildingUpkeep } from "../buildingUpkeep/entities/building-upkeep.entity";
import { Cannon } from "../cannon/entities/cannon.entity";
import { CannonCost } from "../cannonCost/entities/cannon-cost.entity";
import { CannonReqBuilding } from "../cannonReqBuilding/entities/cannon-req-building.entity";
import { CannonReqTech } from "../cannonReqTech/entities/cannon-req-tech.entity";
import { ShipReqBuilding } from "../shipReqBuilding/entities/ship-req-building.entity";
import { ShipUpkeep } from "../shipUpkeep/entities/ship-upkeep.entity";
import { TechProduces } from "../techProduces/entities/tech-produces.entity";
import { TechReqBuilding } from "../techReqBuilding/entities/tech-req-building.entity";
import { TechReqTech } from "../techReqTech/entities/tech-req-tech.entity";
import { Photo } from "../image/image.entity";
import { Ship } from "../ship/entities/ship.entity";
import { ShipCost } from "../shipCost/entities/ship-cost.entity";
import { ShipReqTech } from "../shipReqTech/entities/ship-req-tech.entity";
import { Tech } from "../tech/entities/tech.entity";
import { TechCost } from "../techCost/entities/tech-cost.entity";
import { TechType } from "../techType/entities/tech-type.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Resource,
      Building,
      BuildingCost,
      BuildingProduces,
      BuildingReqBuilding,
      BuildingReqTech,
      BuildingType,
      BuildingUpkeep,
      Cannon,
      CannonCost,
      CannonReqBuilding,
      CannonReqTech,
      Photo,
      Ship,
      ShipCost,
      ShipReqBuilding,
      ShipReqTech,
      ShipUpkeep,
      Tech,
      TechCost,
      TechProduces,
      TechReqBuilding,
      TechReqTech,
      TechType,
    ]),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameBasicsModule {}
