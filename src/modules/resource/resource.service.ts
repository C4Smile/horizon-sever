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
  private stockCached: Stock;

  private async init() {
    this.stockCached = {};
    const allStock = await this.entityService.find();

    // grouping by player
    allStock.forEach((stock) => {
      if (!this.stockCached[stock.playerId]) {
        this.stockCached[stock.playerId] = [];
      }
      this.stockCached[stock.playerId].push(stock);
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
      inStock: config.game.resources[resource.id],
      currentFactor: resource.baseFactor,
    });
    const saved = await this.entityService.save(newResource);

    // grouping by player
    this.stockCached[playerId].push(saved);
  }

  public async doProduction() {
    let resourcesHarvested = 0;
    let playersHarvesting = 0;
    if (this.stockCached) {
      const keys = Object.keys(this.stockCached);
      for (const player of keys) {
        const currentPlayer = this.stockCached[player];
        for (const resource of currentPlayer) {
          if (resource.inStock < resource.maxCapacity) {
            resourcesHarvested++;
            resource.inStock += resource.currentFactor;
            await this.entityService.update({ resourceId: resource.id }, { ...resource });
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
