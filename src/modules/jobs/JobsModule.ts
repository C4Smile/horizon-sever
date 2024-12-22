import { Module } from "@nestjs/common";
import { ResourceProductionService } from "../resource/jobs/Production";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resource } from "../resource/entities/resource.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourceProductionService],
})
export class JobsModule {}
