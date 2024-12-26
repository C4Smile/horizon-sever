import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { GameBasicsDto } from "./dto/game-basics.dto";

// building
import { BuildingCost } from "../buildingCost/entities/building-cost.entity";
import { Building } from "../building/entities/building.entity";
import { BuildingProduces } from "../buildingProduces/entities/building-produces.entity";
import { BuildingReqBuilding } from "../buildingReqBuilding/entities/building-req-building.entity";
import { BuildingReqTech } from "../buildingReqTech/entities/building-req-tech.entity";
import { BuildingType } from "../buildingType/entities/building-type.entity";
import { BuildingUpkeep } from "../buildingUpkeep/entities/building-upkeep.entity";
// cannon
import { Cannon } from "../cannon/entities/cannon.entity";
import { CannonCost } from "../cannonCost/entities/cannon-cost.entity";
import { CannonReqBuilding } from "../cannonReqBuilding/entities/cannon-req-building.entity";
import { CannonReqTech } from "../cannonReqTech/entities/cannon-req-tech.entity";
// photo
import { Photo } from "../image/image.entity";
// ship
import { Ship } from "../ship/entities/ship.entity";
import { ShipCost } from "../shipCost/entities/ship-cost.entity";
import { ShipReqBuilding } from "../shipReqBuilding/entities/ship-req-building.entity";
import { ShipReqTech } from "../shipReqTech/entities/ship-req-tech.entity";
import { ShipUpkeep } from "../shipUpkeep/entities/ship-upkeep.entity";
// tech
import { Tech } from "../tech/entities/tech.entity";
import { TechCost } from "../techCost/entities/tech-cost.entity";
import { TechProduces } from "../techProduces/entities/tech-produces.entity";
import { TechReqBuilding } from "../techReqBuilding/entities/tech-req-building.entity";
import { TechReqTech } from "../techReqTech/entities/tech-req-tech.entity";
import { TechType } from "../techType/entities/tech-type.entity";
// resource
import { Resource } from "../resource/entities/resource.entity";
import config from "src/config/configuration";

@Injectable()
export class GameService {
  private gameBasics: GameBasicsDto;

  async init() {
    this.gameBasics = {
      resources: [],
      buildings: [],
      buildingTypes: [],
      buildingCosts: [],
      buildingUpkeeps: [],
      buildingProduces: [],
      buildingReqBuildings: [],
      buildingReqTechs: [],
      cannons: [],
      cannonCosts: [],
      cannonReqBuildings: [],
      cannonReqTech: [],
      ships: [],
      shipCosts: [],
      shipUpkeeps: [],
      shipReqBuildings: [],
      shipReqTechs: [],
      techs: [],
      techTypes: [],
      techCosts: [],
      techProduces: [],
      techReqBuildings: [],
      techReqTechs: [],
    };
    // fetching
    console.info("Realm:", config.game.realm);
    console.info("Patch:", config.game.patch);
    // resources
    console.info("Fetching resources for game");
    const resources = await this.resourceService.find({
      where: {
        deleted: false,
      },
    });
    console.info(`${resources.length} resources fetched`);
    // buildings
    console.info("Fetching buildings for game");
    const buildings = await this.buildingService.find({
      where: {
        deleted: false,
      },
    });
    const buildingCosts = await this.buildingCostService.find();
    const buildingProduces = await this.buildingProduceService.find();
    const buildingReqBuildings = await this.buildingReqBuildingService.find();
    const buildingReqTechs = await this.buildingReqTechService.find();
    const buildingTypes = await this.buildingTypeService.find();
    const buildingUpkeeps = await this.buildingUpkeepService.find();
    console.info(`${buildings.length} buildings fetched`);
    // photos
    console.info("Fetching photos for game");
    const photos = await this.imageService.find();
    console.info(`${photos.length} photos fetched`);
    // cannons
    console.info("Fetching cannons for game");
    const cannons = await this.cannonService.find({
      where: {
        deleted: false,
      },
    });
    const cannonCosts = await this.cannonCostService.find();
    const cannonReqBuildings = await this.cannonReqBuildingService.find();
    const cannonReqTechs = await this.cannonReqTechService.find();
    console.info(`${cannons.length} cannons fetched`);
    // ships
    console.info("Fetching ships for game");
    const ships = await this.shipService.find({
      where: {
        deleted: false,
      },
    });
    const shipsCosts = await this.shipCostService.find();
    const shipsReqBuildings = await this.shipReqBuildingService.find();
    const shipsReqTechs = await this.shipReqTechService.find();
    const shipUpkeeps = await this.shipUpkeepService.find();
    console.info(`${ships.length} ships fetched`);
    // techs
    console.info("Fetching techs for game");
    const techs = await this.techService.find({
      where: {
        deleted: false,
      },
    });
    const techCosts = await this.techCostService.find();
    const techProduces = await this.techProduceService.find();
    const techReqBuildings = await this.techReqBuildingService.find();
    const techReqTechs = await this.techReqTechService.find();
    const techTypes = await this.techTypeService.find();
    console.info(`${techs.length} techs fetched`);
    // parsing
    // resource
    this.gameBasics.resources = resources.map(({ id, name, imageId, baseFactor, description }) => {
      const urlImage = photos.find((img) => img.id === imageId);
      return { image: urlImage.url, id, name, baseFactor, description };
    });
    // buildings
    this.gameBasics.buildings = buildings.map(
      ({ id, name, imageId, creationTime, description, typeId }) => {
        const urlImage = photos.find((img) => img.id === imageId);
        return { image: urlImage.url, id, name, creationTime, typeId, description };
      },
    );
    this.gameBasics.buildingCosts = buildingCosts.map((rel) => {
      const entityId = rel.buildingId;
      delete rel.buildingId;
      return { ...rel, entityId };
    });
    this.gameBasics.buildingProduces = buildingProduces.map((rel) => {
      const entityId = rel.buildingId;
      delete rel.buildingId;
      return { ...rel, entityId };
    });
    this.gameBasics.buildingReqBuildings = buildingReqBuildings.map((rel) => {
      const entityId = rel.buildingId;
      delete rel.buildingId;
      return { ...rel, entityId };
    });
    this.gameBasics.buildingReqTechs = buildingReqTechs.map((rel) => {
      const entityId = rel.buildingId;
      delete rel.buildingId;
      return { ...rel, entityId };
    });
    this.gameBasics.buildingTypes = buildingTypes.map(({ id, name, imageId }) => {
      const urlImage = photos.find((img) => img.id === imageId);
      return { image: urlImage.url, id, name };
    });
    this.gameBasics.buildingUpkeeps = buildingUpkeeps.map((rel) => {
      const entityId = rel.buildingId;
      delete rel.buildingId;
      return { ...rel, entityId };
    });
    // cannons
  }

  constructor(
    // resource
    @InjectRepository(Resource) private readonly resourceService: Repository<Resource>,
    // building
    @InjectRepository(Building) private readonly buildingService: Repository<Building>,
    @InjectRepository(BuildingCost) private readonly buildingCostService: Repository<BuildingCost>,
    @InjectRepository(BuildingProduces)
    private readonly buildingProduceService: Repository<BuildingProduces>,
    @InjectRepository(BuildingReqBuilding)
    private readonly buildingReqBuildingService: Repository<BuildingReqBuilding>,
    @InjectRepository(BuildingReqTech)
    private readonly buildingReqTechService: Repository<BuildingReqTech>,
    @InjectRepository(BuildingType) private readonly buildingTypeService: Repository<BuildingType>,
    @InjectRepository(BuildingUpkeep)
    private readonly buildingUpkeepService: Repository<BuildingUpkeep>,
    // cannon
    @InjectRepository(Cannon) private readonly cannonService: Repository<Cannon>,
    @InjectRepository(CannonCost) private readonly cannonCostService: Repository<CannonCost>,
    @InjectRepository(CannonReqBuilding)
    private readonly cannonReqBuildingService: Repository<CannonReqBuilding>,
    @InjectRepository(CannonReqTech) private readonly cannonReqTechService: Repository<CannonReqTech>,
    // photo
    @InjectRepository(Photo) private readonly imageService: Repository<Photo>,
    // ship
    @InjectRepository(Ship) private readonly shipService: Repository<Ship>,
    @InjectRepository(ShipCost) private readonly shipCostService: Repository<ShipCost>,
    @InjectRepository(ShipReqBuilding)
    private readonly shipReqBuildingService: Repository<ShipReqBuilding>,
    @InjectRepository(ShipReqTech) private readonly shipReqTechService: Repository<ShipReqTech>,
    @InjectRepository(ShipUpkeep) private readonly shipUpkeepService: Repository<ShipUpkeep>,
    // tech
    @InjectRepository(Tech) private readonly techService: Repository<Tech>,
    @InjectRepository(TechCost) private readonly techCostService: Repository<TechCost>,
    @InjectRepository(TechProduces) private readonly techProduceService: Repository<TechProduces>,
    @InjectRepository(TechReqBuilding)
    private readonly techReqBuildingService: Repository<TechReqBuilding>,
    @InjectRepository(TechReqTech) private readonly techReqTechService: Repository<TechReqTech>,
    @InjectRepository(TechType) private readonly techTypeService: Repository<TechType>,
  ) {
    this.init();
  }

  get() {
    return this.gameBasics;
  }
}
