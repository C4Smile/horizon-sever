import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { PlayerResource } from "./entities/player-resource.entity";

// dto
import { Stock } from "./dto/stock.dto";
import { InitializeDto } from "./dto/initialize.dto";

// config
import config from "src/config/configuration";

@Injectable()
export class PlayerResourceService {
  /** every player's stock, so a production tick never reads the table */
  private stockCached: Stock;

  constructor(
    @InjectRepository(PlayerResource)
    private playerResourceService: Repository<PlayerResource>,
  ) {
    void this.init();
  }

  private async init() {
    this.stockCached = {};
    const allStock = await this.playerResourceService.find();

    // grouping by player
    allStock.forEach((stock) => {
      if (!this.stockCached[stock.playerId]) this.stockCached[stock.playerId] = [];
      if (!this.stockCached[stock.playerId].find((stk) => stock.id === stk.id))
        this.stockCached[stock.playerId].push(stock);
    });
  }

  async getByPlayerId(id: number) {
    const playerResources = await this.playerResourceService.find({
      where: { playerId: id },
    });

    if (!playerResources) throw new HttpException("Resources not Found", HttpStatus.NOT_FOUND);

    return playerResources;
  }

  /**
   * Gives a new player their starting stock, one row per catalogue resource.
   * Runs again without duplicating, so a half finished sign up can be retried.
   */
  @OnEvent("player.created")
  public async initialize(payload: InitializeDto) {
    const { playerId, resources } = payload;

    for (const resource of resources) {
      const alreadyInitialized = await this.playerResourceService.findBy({
        playerId,
        resourceId: resource.id,
      });
      if (alreadyInitialized.length) continue;

      const newResource = this.playerResourceService.create({
        playerId,
        resourceId: resource.id,
        inStock: config.game.resources.basicStart[resource.id] ?? 0,
        maxCapacity: config.game.resources.startCapacity[resource.id] ?? 0,
        currentFactor: resource.baseFactor,
      });

      const saved = await this.playerResourceService.save(newResource);

      if (!this.stockCached[playerId]) this.stockCached[playerId] = [];
      this.stockCached[playerId].push(saved);
    }
  }

  /** one game day of harvesting, capped at what the player can hold */
  @OnEvent("resource.production")
  public async doProduction() {
    let resourcesHarvested = 0;
    let playersHarvesting = 0;

    if (this.stockCached) {
      for (const player of Object.keys(this.stockCached)) {
        for (const resource of this.stockCached[player]) {
          if (resource.inStock < resource.maxCapacity) {
            resourcesHarvested++;
            resource.inStock += resource.currentFactor;
            if (resource.inStock > resource.maxCapacity) resource.inStock = resource.maxCapacity;
            await this.playerResourceService.update(resource.id, { ...resource });
          }
        }
        playersHarvesting++;
      }
    }

    return { resourcesHarvested, playersHarvesting };
  }
}
