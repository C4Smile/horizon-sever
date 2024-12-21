import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ResourceController } from "./resource.controller";

// service
import { ResourceService } from "./resource.service";

// entities
import { Resource } from "./entities/resource.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
