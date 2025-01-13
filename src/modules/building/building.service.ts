import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { sortBy } from "some-javascript-utils/array";

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
import { Resource } from "../resource/entities/resource.entity";
import { CancelQueueDto } from "./dto/cancel-queue.dto";

@Injectable()
export class BuildingService {
  private readonly logger = new Logger(BuildingService.name);
  private queue: Queue = [];
  private inProcess: {
    [key: number]: BuildingQueue;
  } = {};

  //#region queue operations

  private playerQueue(playerId: number) {
    if (!this.queue[playerId]) this.queue[playerId] = [];
    return this.queue[playerId];
  }

  private emptyQueue(playerId: number) {
    return !this.queue[playerId]?.length;
  }

  private getQueueTime(playerId: number) {
    const last = this.queue[playerId][this.queue[playerId].length - 1].endsAt;

    return last.getTime();
  }

  private extractFromTheQueue(playerId: number) {
    if (this.queue[playerId] && this.queue[playerId].length) {
      const [extracted] = this.queue[playerId].splice(0, 1);
      this.assignProcess(playerId, extracted);
    } else this.assignProcess(playerId, null);
  }

  private addToTheQueue(playerId: number, payload: BuildingQueue) {
    if (!this.queue[playerId]) this.queue[playerId] = [];

    this.queue[playerId].push(payload);
  }

  private assignProcess(playerId: number, payload: BuildingQueue) {
    this.inProcess[playerId] = payload;
  }

  private async doCosts(payload: BuildingQueue) {
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
        if (resourceInStock.inStock < cost.base + cost.base * cost.factor * levelToMultiply)
          return false;
      }
    }
    return true;
  }

  private async enqueueToPlayer(playerId: number, payload: BuildingQueue) {
    if (!this.inProcess[playerId]) {
      this.inProcess[playerId] = payload;
      const canBuild = await this.doCosts(payload);
      if (canBuild) {
        this.logger.debug(
          `Building ${payload.building.buildingId}, action ${String(BuildingQueueActions[payload.action])} started`,
        );
        this.eventEmitter.emit("building.started", payload);
      } else
        await this.cancelQueue({
          buildingId: payload.building.buildingId,
          playerId: payload.playerId,
          queueId: payload.id,
          action: payload.action,
        });
    } else {
      this.addToTheQueue(playerId, payload);
      payload.state = BuildingQueueState.Enqueued;
    }
  }

  //#endregion

  private async init() {
    this.queue = {};
    const allQueue = await this.buildingQueueService.find({
      relations: ["building"],
    });

    // grouping enqueued by player

    sortBy(
      allQueue.filter((queue) => queue.state === BuildingQueueState.Enqueued),
      "startAt",
      true,
    ).forEach((queue: BuildingQueue) => {
      this.addToTheQueue(queue.playerId, queue);
    });
    // grouping started by player
    allQueue
      .filter((queue) => queue.state === BuildingQueueState.Started)
      .forEach((queue) => {
        this.assignProcess(queue.playerId, queue);
      });
  }

  constructor(
    @InjectRepository(Building) private buildingService: Repository<Building>,
    @InjectRepository(BuildingQueue) private buildingQueueService: Repository<BuildingQueue>,
    private eventEmitter: EventEmitter2,
    @InjectRepository(Resource) private resourceService: Repository<Resource>,
  ) {
    this.init();
  }

  async getQueueByPlayerId(id: number) {
    const playerQueue = await this.buildingQueueService.find({
      relations: ["building"],
      where: [
        {
          playerId: id,
          state: BuildingQueueState.Enqueued,
        },
        {
          playerId: id,
          state: BuildingQueueState.Started,
        },
      ],
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

  async cancelQueue(dto: CancelQueueDto) {
    this.logger.debug(
      `Building ${dto.buildingId}, action ${String(BuildingQueueActions[dto.action])} could not be started, not enough resources`,
    );
    await this.buildingQueueService.delete(dto.queueId);
    this.eventEmitter.emit("not.resources", {
      playerId: dto.playerId,
      collection: "building",
      entityId: dto.buildingId,
    });
  }

  public async doEnqueue(dto: EnqueueDto) {
    const building = GameService.GameBasics.buildings.find((b) => b.id === dto.buildingId);
    const playerCurrentBuilding = await this.buildingService.findOneBy({
      playerId: dto.playerId,
      buildingId: dto.buildingId,
    });
    if (building) {
      // checking if player can have another
      if (this.playerQueue(dto.playerId).length === 2 && this.inProcess[dto.playerId])
        throw new HttpException("Full queue", HttpStatus.CONFLICT);

      // creating queue
      const today = new Date();

      let levelToMultiply = playerCurrentBuilding?.level > 0 ? playerCurrentBuilding.level : 0;

      switch (dto.action) {
        case BuildingQueueActions.Upgrading:
          levelToMultiply += 1;
          break;
        case BuildingQueueActions.Building:
          levelToMultiply = 1;
      }

      const secondsToAdd = levelToMultiply * building.creationTime * config.game.dayInSeconds;
      const queueTime = this.emptyQueue(dto.playerId)
        ? today.getTime()
        : this.getQueueTime(dto.playerId);

      const ends = new Date(queueTime + secondsToAdd * 1000);

      const newQueueEntity = this.buildingQueueService.create({
        ...dto,
        startedAt: today,
        endsAt: ends,
        state: BuildingQueueState.Started,
      });

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
      await this.enqueueToPlayer(payload.playerId, payload);
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
    if (this.inProcess) {
      const keys = Object.keys(this.inProcess).filter((key) => this.inProcess[key]);
      for (const player of keys) {
        const playerAsNumber = Number(player);

        const currentQueue = this.inProcess[playerAsNumber] as BuildingQueue;
        const endsAt = currentQueue.endsAt.getTime();
        if (today - endsAt >= 0) {
          // completing inProcess
          await this.buildingQueueService.update(currentQueue.id, {
            state: BuildingQueueState.Completed,
          });
          // updated building
          const currentBuilding = await this.buildingService.findOne({
            where: {
              id: currentQueue.buildingId,
            },
          });
          switch (currentQueue.action) {
            case BuildingQueueActions.Downgrading: {
              await this.buildingService.update(currentQueue.buildingId, {
                level: currentBuilding.level - 1,
              });
              break;
            }
            case BuildingQueueActions.Building:
            case BuildingQueueActions.Upgrading: {
              currentQueue.building.state = BuildingState.Working;
              await this.buildingService.update(currentQueue.buildingId, {
                level: currentBuilding.level + 1,
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

          this.extractFromTheQueue(playerAsNumber);
        }

        playersWithQueue++;
      }
    }

    return {
      playersWithQueue,
    };
  }
}
