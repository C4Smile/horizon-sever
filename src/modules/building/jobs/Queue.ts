import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { Repository } from "typeorm/repository/Repository";
import { InjectRepository } from "@nestjs/typeorm";

// service
import { BuildingService } from "../building.service";

// entity
import { Building } from "../entities/building.entity";
import { BuildingQueue } from "../entities/building-queue.entity";

// config
import config from "src/config/configuration";

@Injectable()
export class BuildingQueueService {
  private readonly logger = new Logger(BuildingQueueService.name);
  private buildingService: BuildingService = null;

  constructor(
    @InjectRepository(Building)
    buildingRepository: Repository<Building>,
    @InjectRepository(BuildingQueue)
    buildingQueueRepository: Repository<BuildingQueue>,
  ) {
    this.buildingService = new BuildingService(buildingRepository, buildingQueueRepository);
  }

  @Interval(config.game.dayInSeconds * 100)
  async handleInterval() {
    const startAt = Date.now();
    await this.buildingService.checkQueue();
    const duration = Date.now() - startAt;
    this.logger.debug(`Building queue reviewed completed: ${duration / 1000}, seconds`);
  }
}
