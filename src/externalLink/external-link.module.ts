import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { ExternalLinkController } from "./external-link.controller";

// service
import { ExternalLinkService } from "./external-link.service";

// entities
import { ExternalLink } from "./external-link.entity";
import { ExternalLinkAutomapper } from "./external-link.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([ExternalLink]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [ExternalLinkController],
  providers: [ExternalLinkService, ExternalLinkAutomapper],
  exports: [ExternalLinkService, ExternalLinkAutomapper],
})
export class ExternalLinkModule {}
