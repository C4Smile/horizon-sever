import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { ExternalLinkController } from "./external-link.controller";

// service
import { ExternalLinkService } from "./external-link.service";

// entities
import { ExternalLink } from "./external-link.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ExternalLink])],
  controllers: [ExternalLinkController],
  providers: [ExternalLinkService],
  exports: [ExternalLinkService],
})
export class ExternalLinkModule {}
