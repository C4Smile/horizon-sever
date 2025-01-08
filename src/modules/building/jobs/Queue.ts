import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { EventEmitter2 } from "@nestjs/event-emitter";

// config
import config from "src/config/configuration";
@Injectable()
export class BuildingQueueService {
  private readonly logger = new Logger(BuildingQueueService.name);

  constructor(private eventEmitter: EventEmitter2) {}

  @Interval(config.game.dayInSeconds * 1000)
  async handleInterval() {
    this.logger.debug(`Checking building queue`);
    this.eventEmitter.emit("building.check");
  }
}
