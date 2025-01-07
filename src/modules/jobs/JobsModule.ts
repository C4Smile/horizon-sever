import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// entity
import { Resource } from "../resource/entities/resource.entity";
import { Building } from "../building/entities/building.entity";
import { BuildingQueue } from "../building/entities/building-queue.entity";

// jobs
import { ResourceProductionService } from "../resource/jobs/Production";
import { BuildingQueueService } from "../building/jobs/Queue";

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Building, BuildingQueue])],
  providers: [ResourceProductionService, BuildingQueueService],
})
export class JobsModule {}
