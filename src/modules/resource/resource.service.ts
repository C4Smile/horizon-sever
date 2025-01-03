import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Resource } from "./entities/resource.entity";

// dto
import { AddModelDto } from "../models/dto/add-model.dto";
import { UpdateModelDto } from "../models/dto/update-model.dto";
import { Stock } from "./jobs/stock.dto";
import { GameResourceDto } from "../game/dto/resource/game-resource.dto";

// config
import config from "src/config/configuration";

@Injectable()
export class ResourceService extends CrudService<Resource, AddModelDto, UpdateModelDto> {
  static StockCached: Stock;

  private async init() {
    ResourceService.StockCached = {};
    const allStock = await this.entityService.find();

    // grouping by player
    allStock.forEach((stock) => {
      if (!ResourceService.StockCached[stock.playerId]) {
        ResourceService.StockCached[stock.playerId] = [];
      }
      ResourceService.StockCached[stock.playerId].push(stock);
    });
  }

  constructor(@InjectRepository(Resource) private resourceService: Repository<Resource>) {
    const relationships = [""];
    super(resourceService, null, relationships);

    this.init();
  }

  async getByPlayerId(id: number) {
    const playerResources = await this.entityService.find({
      where: {
        playerId: id,
      },
    });

    if (!playerResources) throw new HttpException("Resources not Found", HttpStatus.NOT_FOUND);

    return playerResources;
  }

  public async initialize(playerId: number, resource: GameResourceDto) {
    const newResource = this.resourceService.create({
      playerId,
      resourceId: resource.id,
      inStock: config.game.resources.basicStart[resource.id],
      maxCapacity: config.game.resources.startCapacity[resource.id],
      currentFactor: resource.baseFactor,
    });

    const saved = await this.entityService.save(newResource);

    // grouping by player
    if (!ResourceService.StockCached[playerId]) ResourceService.StockCached[playerId] = [];
    ResourceService.StockCached[playerId].push(saved);
  }

  public async doProduction() {
    let resourcesHarvested = 0;
    let playersHarvesting = 0;
    if (ResourceService.StockCached) {
      const keys = Object.keys(ResourceService.StockCached);
      for (const player of keys) {
        const currentPlayer = ResourceService.StockCached[player];
        for (const resource of currentPlayer) {
          if (resource.inStock < resource.maxCapacity) {
            resourcesHarvested++;
            resource.inStock += resource.currentFactor;
            await this.entityService.update(resource.id, { ...resource });
          }
        }
        playersHarvesting++;
      }
    }
    return {
      resourcesHarvested,
      playersHarvesting,
    };
  }
}
