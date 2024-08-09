import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { MuseumUserController } from "./museum-user.controller";

// service
import { MuseumUserService } from "./museum-user.service";

// entities
import { MuseumUser } from "./museum-user.entity";
import { MuseumRole } from "src/museumRole/museum-role.entity";
import { MuseumRoleModule } from "src/museumRole/museum-role.module";

// automapper
import { MuseumUserAutomapper } from "./mueum-user.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([MuseumUser, MuseumRole]),
    MuseumRoleModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [MuseumUserController],
  providers: [MuseumUserService, MuseumUserAutomapper],
  exports: [MuseumUserService, MuseumUserAutomapper],
})
export class MuseumUserModule {}
