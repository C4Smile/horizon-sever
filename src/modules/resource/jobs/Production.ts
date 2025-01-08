import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { EventEmitter2 } from "@nestjs/event-emitter";

// config
import config from "src/config/configuration";

@Injectable()
export class ResourceProductionService {
  private readonly logger = new Logger(ResourceProductionService.name);
  private dayCount = 1;

  constructor(private eventEmitter: EventEmitter2) {}

  @Interval(config.game.dayInSeconds * 1000)
  async handleInterval() {
    this.logger.debug(`Day ${this.dayCount} off`);
    this.dayCount++;
    this.eventEmitter.emit("resource.production");
  }
}
