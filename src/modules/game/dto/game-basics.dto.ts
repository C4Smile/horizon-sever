import { GameBuildingDto } from "./building/game-building.dto";
import { GameEntityReqBuildingDto } from "./game-entity-req-building.dto";
import { GameResourceRelationshipDto } from "./game-resource-relationship.dto";
import { GameEntityReqTechDto } from "./game-entity-req-tech.dto";
import { GameBuildingTypeDto } from "./building/game-building-type.dto";
import { GameCannonDto } from "./cannon/game-cannon.dto";
import { GameShipDto } from "./ship/game-ship.dto";
import { GameTechDto } from "./tech/game-tech.dto";
import { GameTechTypeDto } from "./tech/game-tech-type.dto";
import { GameResourceDto } from "./resource/resource/game-resource.dto";

export type GameBasicsDto = {
  resources: GameResourceDto[];
  buildings: GameBuildingDto[];
  buildingTypes: GameBuildingTypeDto[];
  buildingCosts: GameResourceRelationshipDto[];
  buildingUpkeeps: GameResourceRelationshipDto[];
  buildingProduces: GameResourceRelationshipDto[];
  buildingReqBuildings: GameEntityReqBuildingDto[];
  buildingReqTechs: GameEntityReqTechDto[];
  cannons: GameCannonDto[];
  cannonCosts: GameResourceRelationshipDto[];
  cannonReqBuildings: GameEntityReqBuildingDto[];
  cannonReqTechs: GameEntityReqTechDto[];
  ships: GameShipDto[];
  shipCosts: GameResourceRelationshipDto[];
  shipUpkeeps: GameResourceRelationshipDto[];
  shipReqBuildings: GameEntityReqBuildingDto[];
  shipReqTechs: GameEntityReqTechDto[];
  techs: GameTechDto[];
  techTypes: GameTechTypeDto[];
  techCosts: GameResourceRelationshipDto[];
  techProduces: GameResourceRelationshipDto[];
  techReqBuildings: GameEntityReqBuildingDto[];
  techReqTechs: GameEntityReqTechDto[];
};
