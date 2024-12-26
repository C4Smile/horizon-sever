import { GameBuildingDto } from "./building/game-building.dto";
import { GameEntityReqBuildingDto } from "./game-entity-req-building.dto";
import { GameResourceRelationshipDto } from "./game-resource-relationship.dto";
import { GameEntityReqTechDto } from "./game-entity-req-tech.dto";
import { GameBuildingTypeDto } from "./building/game-building-type.dto";
import { GameCannonDto } from "./cannon/game-cannon.dto";
import { GameShipDto } from "./ship/game-ship.dto";
import { GameTechDto } from "./tech/game-tech.dto";
import { GameTechTypeDto } from "./tech/game-tech-type.dto";
import { GameResourceDto } from "./resource/game-resource.dto";

type Dictionary<data> = {
  [key: number]: data;
};

export type GameBasicsDto = {
  resources: Dictionary<GameResourceDto>;
  buildings: Dictionary<GameBuildingDto>;
  buildingTypes: Dictionary<GameBuildingTypeDto>;
  buildingCosts: Dictionary<GameResourceRelationshipDto>;
  buildingUpkeeps: Dictionary<GameResourceRelationshipDto>;
  buildingProduces: Dictionary<GameResourceRelationshipDto>;
  buildingReqBuildings: Dictionary<GameEntityReqBuildingDto>;
  buildingReqTechs: Dictionary<GameEntityReqTechDto>;
  cannons: Dictionary<GameCannonDto>;
  cannonCosts: Dictionary<GameResourceRelationshipDto>;
  cannonReqBuildings: Dictionary<GameEntityReqBuildingDto>;
  cannonReqTech: Dictionary<GameEntityReqTechDto>;
  ships: Dictionary<GameShipDto>;
  shipCosts: Dictionary<GameResourceRelationshipDto>;
  shipUpkeeps: Dictionary<GameResourceRelationshipDto>;
  shipReqBuildings: Dictionary<GameEntityReqBuildingDto>;
  shipReqTechs: Dictionary<GameEntityReqTechDto>;
  techs: Dictionary<GameTechDto>;
  techTypes: Dictionary<GameTechTypeDto>;
  techCosts: Dictionary<GameResourceRelationshipDto>;
  techProduces: Dictionary<GameResourceRelationshipDto>;
  techReqBuildings: Dictionary<GameEntityReqBuildingDto>;
  techReqTechs: Dictionary<GameEntityReqTechDto>;
};
