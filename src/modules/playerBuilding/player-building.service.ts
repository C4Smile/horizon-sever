import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

// entity
import { BuildingState, PlayerBuilding } from "./entities/player-building.entity";
import {
  BuildingQueue,
  BuildingQueueActions,
  BuildingQueueState,
} from "./entities/building-queue.entity";
import { PlayerResource } from "../playerResource/entities/player-resource.entity";

// dto
import { Queue } from "./jobs/queue.dto";
import { EnqueueDto } from "./dto/enqueue.dto";
import { CancelQueueDto } from "./dto/cancel-queue.dto";

// config
import config from "src/config/configuration";

// game service, the catalogue every player action is measured against
import { GameService } from "../game/game.service";

@Injectable()
export class PlayerBuildingService {
  private readonly logger = new Logger(PlayerBuildingService.name);
  /** what is waiting per player */
  private queue: Queue = {};
  /** what is being built right now per player, one at a time */
  private inProcess: { [playerId: number]: BuildingQueue } = {};

  //#region queue operations

  private playerQueue(playerId: number) {
    if (!this.queue[playerId]) this.queue[playerId] = [];
    return this.queue[playerId];
  }

  private emptyQueue(playerId: number) {
    return !this.queue[playerId]?.length;
  }

  private getQueueTime(playerId: number) {
    return this.queue[playerId][this.queue[playerId].length - 1].endsAt.getTime();
  }

  private extractFromTheQueue(playerId: number) {
    if (this.queue[playerId]?.length) {
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

  /**
   * @param payload - the queued action about to start
   * @returns whether the player can pay for it
   */
  private async canPayFor(payload: BuildingQueue) {
    const costs = this.gameService.get().buildingCosts.filter(
      (b) => b.entityId === payload.building.buildingId,
    );
    if (!costs.length) return true;

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
      const needed = cost.base + cost.base * cost.factor * levelToMultiply;
      if (!resourceInStock || resourceInStock.inStock < needed) return false;
    }
    return true;
  }

  private async enqueueToPlayer(playerId: number, payload: BuildingQueue) {
    if (this.inProcess[playerId]) {
      this.addToTheQueue(playerId, payload);
      payload.state = BuildingQueueState.Enqueued;
      return;
    }

    this.inProcess[playerId] = payload;
    if (await this.canPayFor(payload)) {
      this.logger.debug(
        `Building ${payload.building.buildingId}, action ${String(BuildingQueueActions[payload.action])} started`,
      );
      this.eventEmitter.emit("building.started", payload);
    } else {
      this.assignProcess(playerId, null);
      await this.cancelQueue({
        buildingId: payload.building.buildingId,
        playerId: payload.playerId,
        queueId: payload.id,
        action: payload.action,
      });
    }
  }

  //#endregion

  /** picks the queue back up where a restart left it */
  private async init() {
    this.queue = {};
    const allQueue = await this.buildingQueueService.find({ relations: ["building"] });

    allQueue
      .filter((queue) => queue.state === BuildingQueueState.Enqueued)
      // oldest first, so the queue comes back in the order it was filled
      .sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime())
      .forEach((queue) => this.addToTheQueue(queue.playerId, queue));

    allQueue
      .filter((queue) => queue.state === BuildingQueueState.Started)
      .forEach((queue) => this.assignProcess(queue.playerId, queue));
  }

  constructor(
    @InjectRepository(PlayerBuilding) private playerBuildingService: Repository<PlayerBuilding>,
    @InjectRepository(BuildingQueue) private buildingQueueService: Repository<BuildingQueue>,
    @InjectRepository(PlayerResource) private playerResourceService: Repository<PlayerResource>,
    private eventEmitter: EventEmitter2,
    private gameService: GameService,
  ) {
    void this.init();
  }

  async getQueueByPlayerId(id: number) {
    return await this.buildingQueueService.find({
      relations: ["building"],
      where: [
        { playerId: id, state: BuildingQueueState.Enqueued },
        { playerId: id, state: BuildingQueueState.Started },
      ],
    });
  }

  async getBuildingByPlayerId(id: number) {
    return await this.playerBuildingService.find({
      where: { playerId: id, state: Not(BuildingState.Demolished) },
    });
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
    const building = this.gameService.get().buildings.find((b) => b.id === dto.buildingId);
    if (!building) throw new HttpException("Building not Found", HttpStatus.NOT_FOUND);

    const playerCurrentBuilding = await this.playerBuildingService.findOneBy({
      playerId: dto.playerId,
      buildingId: dto.buildingId,
    });

    if (
      this.playerQueue(dto.playerId).length >= config.game.queue.building &&
      this.inProcess[dto.playerId]
    )
      throw new HttpException("Full queue", HttpStatus.CONFLICT);

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
      playerId: dto.playerId,
      action: dto.action,
      startedAt: today,
      endsAt: ends,
      state: BuildingQueueState.Started,
    });

    // the player needs a row for this building before anything can be queued on it
    let savedBuilding: PlayerBuilding = playerCurrentBuilding;
    if (!savedBuilding) {
      savedBuilding = await this.playerBuildingService.save(
        this.playerBuildingService.create({
          buildingId: dto.buildingId,
          playerId: dto.playerId,
          level: 0,
          state: BuildingState.Constructing,
        }),
      );
    }

    newQueueEntity.buildingId = savedBuilding.id;
    newQueueEntity.building = savedBuilding;

    const savedQueue = await this.buildingQueueService.save(newQueueEntity);

    this.logger.debug(
      `Enqueueing building ${dto.buildingId}, action ${String(BuildingQueueActions[savedQueue.action])}`,
    );
    this.eventEmitter.emit("building.enqueued", savedQueue);

    return { status: 200 };
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

    for (const player of Object.keys(this.inProcess).filter((key) => this.inProcess[key])) {
      const playerAsNumber = Number(player);
      const currentQueue = this.inProcess[playerAsNumber];
      if (today - currentQueue.endsAt.getTime() < 0) {
        playersWithQueue++;
        continue;
      }

      await this.buildingQueueService.update(currentQueue.id, {
        state: BuildingQueueState.Completed,
      });

      const currentBuilding = await this.playerBuildingService.findOne({
        where: { id: currentQueue.buildingId },
      });

      switch (currentQueue.action) {
        case BuildingQueueActions.Downgrading:
          await this.playerBuildingService.update(currentQueue.buildingId, {
            level: currentBuilding.level - 1,
          });
          break;
        case BuildingQueueActions.Building:
        case BuildingQueueActions.Upgrading:
          currentQueue.building.state = BuildingState.Working;
          await this.playerBuildingService.update(currentQueue.buildingId, {
            level: currentBuilding.level + 1,
            state: currentQueue.building.state,
          });
          break;
        case BuildingQueueActions.Demolishing:
          currentQueue.building.state = BuildingState.Demolished;
          await this.playerBuildingService.update(currentQueue.buildingId, {
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
      playersWithQueue++;
    }

    return { playersWithQueue };
  }
}
