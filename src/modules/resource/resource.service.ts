import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Resource } from "./entities/resource.entity";
import { Building } from "../building/entities/building.entity";

// dto
import { AddModelDto } from "../models/dto/add-model.dto";
import { UpdateModelDto } from "../models/dto/update-model.dto";
import { Stock } from "./jobs/stock.dto";
import { GameResourceDto } from "../game/dto/resource/game-resource.dto";
import { BuildingQueue, BuildingQueueActions } from "../building/entities/building-queue.entity";

// config
import config from "src/config/configuration";

// service
import { GameService } from "../game/game.service";
import { InitializeDto } from "./dto/initialize.dto";

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
      if (!this.stockCached[stock.playerId].find((stk) => stock.id === stk.id))
        this.stockCached[stock.playerId].push(stock);
    });
  }

  constructor(
    @InjectRepository(Resource) private resourceService: Repository<Resource>,
    private eventEmitter: EventEmitter2,
  ) {
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

  @OnEvent("player.created")
  public async initialize(payload: InitializeDto) {
    const { playerId, resources } = payload;

    for (const resource of resources) {
      const alreadyInitialized = await this.resourceService.findBy({
        playerId,
        resourceId: resource.id,
      });
      if (!alreadyInitialized.length) {
        const newResource = this.resourceService.create({
          playerId,
          resourceId: resource.id,
          inStock: config.game.resources.basicStart[resource.id],
          maxCapacity: config.game.resources.startCapacity[resource.id],
          currentFactor: resource.baseFactor,
        });

        const saved = await this.entityService.save(newResource);

        // grouping by player
        if (!this.stockCached[playerId]) this.stockCached[playerId] = [];
        this.stockCached[playerId].push(saved);
      }
    }
  }

  @OnEvent("resource.production")
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
            if (resource.inStock > resource.maxCapacity) resource.inStock = resource.maxCapacity;
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

  @OnEvent("building.started")
  async handleBuildingStarted(payload: BuildingQueue) {
    const costs = GameService.GameBasics.buildingCosts.filter(
      (b) => b.entityId === payload.building.buildingId,
    );
    if (costs.length) {
      let levelToMultiply = payload.building.level;

      switch (payload.action) {
        case BuildingQueueActions.Upgrading:
          levelToMultiply += 1;
          break;
        case BuildingQueueActions.Building:
          levelToMultiply = 1;
      }

      // checking for each cost
      for (const cost of costs) {
        const resourceInStock = await this.resourceService.findOneBy({
          resourceId: cost.resourceId,
        });
        const toExtract = cost.base + cost.base * cost.factor * levelToMultiply;
        await this.entityService.update(resourceInStock.id, {
          inStock: resourceInStock.inStock - toExtract,
        });
      }
    }
  }

  @OnEvent("building.completed")
  async handleBuildingCompleted(payload: BuildingQueue) {
    const playerStock = this.stockCached[payload.playerId];
    const buildingProduction = GameService.GameBasics.buildingProduces.filter(
      (b) => b.entityId === payload.building.buildingId,
    );

    if (playerStock?.length && buildingProduction.length) {
      for (const bP of buildingProduction) {
        const currentResource = playerStock.findIndex((r) => r.resourceId === bP.resourceId);
        if (currentResource >= 0) {
          // update directly
          const { id, currentFactor } = this.stockCached[payload.playerId][currentResource];

          let toSave = currentFactor;

          switch (payload.action) {
            case BuildingQueueActions.Building:
            case BuildingQueueActions.Upgrading: {
              toSave += bP.factor;
              break;
            }
            case BuildingQueueActions.Demolishing:
            case BuildingQueueActions.Downgrading:
              toSave -= bP.factor;
              break;
          }

          this.stockCached[payload.playerId][currentResource] = {
            ...this.stockCached[payload.playerId][currentResource],
            currentFactor: toSave,
          };
          //* updating in db
          await this.entityService.update(id, {
            currentFactor: toSave,
          });
        }
      }
    }
  }
}
