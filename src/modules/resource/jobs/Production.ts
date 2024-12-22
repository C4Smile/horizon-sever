import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { ResourceService } from "../resource.service";
import { Resource } from "../entities/resource.entity";
import { Repository } from "typeorm/repository/Repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ResourceProductionService {
  private readonly logger = new Logger(ResourceProductionService.name);
  private resourceService = null;

  constructor(
    @InjectRepository(Resource)
    resourceRepository: Repository<Resource>,
  ) {
    this.resourceService = new ResourceService(resourceRepository);
  }

  @Interval(3000)
  async handleInterval() {
    const startAt = Date.now();
    await this.resourceService.doProduction();
    const duration = Date.now() - startAt;
    this.logger.debug(`Resource harvesting completed: ${duration / 1000}, seconds`);
  }
}
