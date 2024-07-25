import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

// controller
import { TagController } from "./tag.controller";

// service
import { TagService } from "./tag.service";

// entities
import { Tag } from "./tag.entity";
import { TagAutomapper } from "./tag.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [TagController],
  providers: [TagService, TagAutomapper],
  exports: [TagService, TagAutomapper],
})
export class TagModule {}
