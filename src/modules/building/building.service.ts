import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// service
import { ResourceService } from "../resource/resource.service";

// entity
import { Building, BuildingState } from "./entities/building.entity";
import {
  BuildingQueue,
  BuildingQueueActions,
  BuildingQueueState,
} from "./entities/building-queue.entity";

// dto
import { AddModelDto } from "../models/dto/add-model.dto";
import { UpdateModelDto } from "../models/dto/update-model.dto";
import { Queue } from "./jobs/queue.dto";
import { GameBuildingDto } from "../game/dto/building/game-building.dto";
import { EnqueueDto } from "./dto/enqueue.dto";

// config
import config from "src/config/configuration";
import { GameService } from "../game/game.service";
import { AddBuildingQueueDto } from "./dto/add-building-queue.dto";

@Injectable()
export class BuildingService {
  static Queue: Queue;

  private async init() {
    BuildingService.Queue = {};
    const allQueue = await this.buildingQueueService.find({ relations: ["building"] });

    // grouping by player
    allQueue.forEach((queue) => {
      if (!BuildingService.Queue[queue.playerId]) {
        BuildingService.Queue[queue.playerId] = [];
      }
      BuildingService.Queue[queue.playerId].push(queue);
    });
  }

  constructor(
    @InjectRepository(Building) private buildingService: Repository<Building>,
    @InjectRepository(Building) private buildingQueueService: Repository<BuildingQueue>,
  ) {
    this.init();
  }

  async getQueueByPlayerId(id: number) {
    const playerQueue = await this.buildingQueueService.find({
      where: {
        playerId: id,
      },
    });

    if (!playerQueue) throw new HttpException("Buildings not Found", HttpStatus.NOT_FOUND);

    return playerQueue;
  }

  async getBuildingByPlayerId(id: number) {
    const playerQueue = await this.buildingService.find({
      where: {
        playerId: id,
      },
    });

    if (!this.buildingService) throw new HttpException("Buildings not Found", HttpStatus.NOT_FOUND);

    return this.buildingService;
  }

  public async enqueue(dto: EnqueueDto) {
    let playerQueue = BuildingService.Queue[dto.playerId];
    const building = GameService.GameBasics.buildings.find((b) => b.id === dto.buildingId);
    const playerCurrentBuilding = await this.buildingService.findOneBy({
      playerId: dto.playerId,
    });
    if (building) {
      // creating queue
      const today = new Date();
      const ends = today;
      ends.setSeconds(
        ((playerCurrentBuilding ? playerCurrentBuilding.level : 1) + building.creationTime) *
          config.game.dayInSeconds +
          ends.getSeconds(),
      );
      const newQueueEntity = this.buildingQueueService.create({
        ...dto,
        startedAt: today,
        endsAt: ends,
        state: BuildingQueueState.Started,
      });

      if (!playerQueue) playerQueue = BuildingService.Queue[dto.playerId] = [];
      if (playerQueue.length) {
        newQueueEntity.state = BuildingQueueState.Enqueued;
      }

      // creating default building row
      const newBuildingEntity = this.buildingService.create({
        buildingId: dto.buildingId,
        playerId: dto.playerId,
        level: 0,
        state: BuildingState.Constructing,
      });

      const savedBuilding = await this.buildingService.save(newBuildingEntity);

      // inserting queue in db
      const savedQueue = await this.buildingQueueService.save(newQueueEntity);
      // linking relationship
      savedQueue.buildingId = savedBuilding.id;
      savedQueue.building = savedBuilding;
      // enqueueing
      BuildingService.Queue[dto.playerId].push(savedQueue);
    } else throw new HttpException("Building not Found", HttpStatus.NOT_FOUND);
  }

  public async checkQueue() {
    let playersWithQueue = 0;
    const today = Date.now();

    if (BuildingService.Queue) {
      const keys = Object.keys(BuildingService.Queue);
      for (const player of keys) {
        const outTheQueue = [];

        const currentPlayerQueue = BuildingService.Queue[player] as BuildingQueue[];

        for (let i = 0; i < currentPlayerQueue.length; ++i) {
          const currentQueue = currentPlayerQueue[i] as BuildingQueue;
          const endsAt = currentQueue.endsAt.getTime();
          if (today - endsAt >= 0) {
            // completing queue
            await this.buildingQueueService.update(currentQueue.id, {
              state: BuildingQueueState.Completed,
            });
            // updated building
            switch (currentQueue.action) {
              case BuildingQueueActions.Downgrading: {
                currentQueue.building.level += 1;
                await this.buildingService.update(currentQueue.buildingId, {
                  level: currentQueue.building.level,
                });
                break;
              }
              case BuildingQueueActions.Building:
              case BuildingQueueActions.Upgrading: {
                currentQueue.building.level += 1;
                currentQueue.building.state = BuildingState.Working;
                await this.buildingService.update(currentQueue.buildingId, {
                  level: currentQueue.building.level,
                  state: currentQueue.building.state,
                });
                break;
              }
              case BuildingQueueActions.Demolishing:
                currentQueue.building.state = BuildingState.Demolished;
                const existing = await this.buildingService.update(currentQueue.buildingId, {
                  level: 0,
                  state: currentQueue.building.state,
                });
                break;
            }
            ResourceService.modifiedBuilding(currentQueue.playerId, currentQueue.building);
            outTheQueue.push(i);
          }
        }

        // detach completed queue
        outTheQueue.forEach((i) => currentPlayerQueue.splice(i, 1));

        playersWithQueue++;
      }
    }

    return {
      playersWithQueue,
    };
  }
}
