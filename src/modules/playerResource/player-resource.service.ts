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

// game
import { GameService } from "../game/game.service";
import {
  BuildingQueue,
  BuildingQueueActions,
} from "../playerBuilding/entities/building-queue.entity";

@Injectable()
export class PlayerResourceService {
  /** every player's stock, so a production tick never reads the table */
  private stockCached: Stock;

  constructor(
    @InjectRepository(PlayerResource)
    private playerResourceService: Repository<PlayerResource>,
    private gameService: GameService,
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

  /** takes what the action costs out of the player's stock */
  @OnEvent("building.started")
  async handleBuildingStarted(payload: BuildingQueue) {
    const costs = this.gameService.get().buildingCosts.filter(
      (b) => b.entityId === payload.building.buildingId,
    );
    if (!costs.length) return;

    let levelToMultiply = payload.building.level;
    switch (payload.action) {
      case BuildingQueueActions.Upgrading:
        levelToMultiply += 1;
        break;
      case BuildingQueueActions.Building:
        levelToMultiply = 1;
    }

    for (const cost of costs) {
      const resourceInStock = await this.playerResourceService.findOneBy({
        playerId: payload.playerId,
        resourceId: cost.resourceId,
      });
      if (!resourceInStock) continue;

      const toExtract = cost.base + cost.base * cost.factor * levelToMultiply;
      const left = resourceInStock.inStock - toExtract;
      await this.playerResourceService.update(resourceInStock.id, { inStock: left });
      this.syncCache(payload.playerId, resourceInStock.id, { inStock: left });
    }
  }

  /**
   * A finished building changes how fast its resources come in, up when it went
   * up a level and down when it came down.
   */
  @OnEvent("building.completed")
  async handleBuildingCompleted(payload: BuildingQueue) {
    const playerStock = this.stockCached[payload.playerId];
    const buildingProduction = this.gameService.get().buildingProduces.filter(
      (b) => b.entityId === payload.building.buildingId,
    );
    if (!playerStock?.length || !buildingProduction.length) return;

    for (const produces of buildingProduction) {
      const current = playerStock.find((r) => r.resourceId === produces.resourceId);
      if (!current) continue;

      let currentFactor = current.currentFactor;
      switch (payload.action) {
        case BuildingQueueActions.Building:
        case BuildingQueueActions.Upgrading:
          currentFactor += produces.factor;
          break;
        case BuildingQueueActions.Demolishing:
        case BuildingQueueActions.Downgrading:
          currentFactor -= produces.factor;
          break;
      }

      await this.playerResourceService.update(current.id, { currentFactor });
      this.syncCache(payload.playerId, current.id, { currentFactor });
    }
  }

  /**
   * Keeps the cached stock in step with what just went to the table, so the
   * next production tick harvests the new numbers.
   * @param playerId - whose stock
   * @param id - the row that changed
   * @param changes - the fields that changed
   */
  private syncCache(playerId: number, id: number, changes: Partial<PlayerResource>) {
    const cached = this.stockCached[playerId]?.find((r) => r.id === id);
    if (cached) Object.assign(cached, changes);
  }
}
