import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

// entity
import { Building, BuildingState } from "./entities/building.entity";
import {
  BuildingQueue,
  BuildingQueueActions,
  BuildingQueueState,
} from "./entities/building-queue.entity";

// dto
import { Queue } from "./jobs/queue.dto";
import { EnqueueDto } from "./dto/enqueue.dto";

// config
import config from "src/config/configuration";

// game service
import { GameService } from "../game/game.service";

@Injectable()
export class BuildingService {
  private readonly logger = new Logger(BuildingService.name);
  private queue: Queue;

  private async init() {
    this.queue = {};
    const allQueue = await this.buildingQueueService.find({
      relations: ["building"],
    });

    // grouping by player
    allQueue
      .filter(
        (queue) =>
          queue.state === BuildingQueueState.Enqueued || queue.state === BuildingQueueState.Started,
      )
      .forEach((queue) => {
        if (!this.queue[queue.playerId]) {
          this.queue[queue.playerId] = [];
        }
        this.queue[queue.playerId].push(queue);
      });
  }

  constructor(
    @InjectRepository(Building) private buildingService: Repository<Building>,
    @InjectRepository(BuildingQueue) private buildingQueueService: Repository<BuildingQueue>,
    private eventEmitter: EventEmitter2,
  ) {
    this.init();
  }

  async getQueueByPlayerId(id: number) {
    const playerQueue = await this.buildingQueueService.find({
      where: {
        playerId: id,
      },
    });

    return playerQueue;
  }

  async getBuildingByPlayerId(id: number) {
    const playerBuildings = await this.buildingService.find({
      where: {
        playerId: id,
        state: Not(BuildingState.Demolished),
      },
    });

    return playerBuildings;
  }

  public async doEnqueue(dto: EnqueueDto) {
    let playerQueue = this.queue[dto.playerId];
    const building = GameService.GameBasics.buildings.find((b) => b.id === dto.buildingId);
    const playerCurrentBuilding = await this.buildingService.findOneBy({
      playerId: dto.playerId,
      buildingId: dto.buildingId,
    });
    if (building) {
      // creating queue
      const today = new Date();

      console.log(playerCurrentBuilding, dto.action);

      let levelToMultiply = playerCurrentBuilding?.level > 0 ? playerCurrentBuilding.level : 0;

      switch (dto.action) {
        case BuildingQueueActions.Upgrading:
          levelToMultiply += 1;
          break;
        case BuildingQueueActions.Building:
          levelToMultiply = 1;
      }

      const secondsToAdd = levelToMultiply * building.creationTime * config.game.dayInSeconds;

      console.log(secondsToAdd, levelToMultiply);

      const ends = new Date(today.getTime() + secondsToAdd * 1000);

      const newQueueEntity = this.buildingQueueService.create({
        ...dto,
        startedAt: today,
        endsAt: ends,
        state: BuildingQueueState.Started,
      });

      if (!playerQueue) playerQueue = this.queue[dto.playerId] = [];
      if (playerQueue.length) {
        newQueueEntity.state = BuildingQueueState.Enqueued;
      }

      // creating default building row
      let savedBuilding: Building = null;
      if (!playerCurrentBuilding) {
        const newBuildingEntity = this.buildingService.create({
          buildingId: dto.buildingId,
          playerId: dto.playerId,
          level: 0,
          state: BuildingState.Constructing,
        });

        savedBuilding = await this.buildingService.save(newBuildingEntity);
      } else savedBuilding = playerCurrentBuilding;

      // linking relationship
      newQueueEntity.buildingId = savedBuilding.id;
      newQueueEntity.building = savedBuilding;

      // inserting queue in db
      const savedQueue = await this.buildingQueueService.save(newQueueEntity);

      // enqueueing
      this.logger.debug(
        `Enqueueing building ${dto.buildingId}, action ${String(BuildingQueueActions[savedQueue.action])}`,
      );
      this.eventEmitter.emit("building.enqueued", savedQueue);

      return { status: 200 };
    } else throw new HttpException("Building not Found", HttpStatus.NOT_FOUND);
  }

  @OnEvent("building.enqueued")
  async enqueue(payload: BuildingQueue) {
    try {
      this.queue[payload.playerId].push(payload);
      this.logger.debug("Enqueuing correctly");
    } catch (err) {
      this.logger.error("Enqueuing error");
      this.logger.error(err);
    }
  }

  @OnEvent("building.check")
  public async checkQueue() {
    let playersWithQueue = 0;
    const today = Date.now();

    if (this.queue) {
      const keys = Object.keys(this.queue);
      for (const player of keys) {
        const outTheQueue = [];

        const currentPlayerQueue = this.queue[player] as BuildingQueue[];

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

            this.logger.debug(
              `Building ${currentQueue.building.buildingId}, action ${String(BuildingQueueActions[currentQueue.action])} completed`,
            );
            this.eventEmitter.emit("building.completed", currentQueue);

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
