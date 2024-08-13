import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";
import { Repository } from "typeorm";

// modules
import { MuseumRoleModule } from "src/museumRole/museum-role.module";

// controller
import { MuseumUserController } from "./museum-user.controller";

// service
import { MuseumUserService } from "./museum-user.service";

// entities
import { User } from "src/user/user.entity";
import { MuseumUser } from "./museum-user.entity";
import { MuseumRole } from "src/museumRole/museum-role.entity";

// automapper
import { MuseumUserAutomapper } from "./mueum-user.automapper";

// base
import { CrudService } from "src/models/service/CrudService";

@Module({
  imports: [
    TypeOrmModule.forFeature([MuseumUser, MuseumRole, User]),
    MuseumRoleModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [MuseumUserController],
  providers: [Repository, Array, CrudService, MuseumUserService, MuseumUserAutomapper],
  exports: [MuseumUserService, MuseumUserAutomapper],
})
export class MuseumUserModule {}
