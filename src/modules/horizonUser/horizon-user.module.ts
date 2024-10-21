import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";
import { Repository } from "typeorm";

// modules
import { HorizonRoleModule } from "src/modules/horizonRole/horizon-role.module";

// controller
import { HorizonUserController } from "./horizon-user.controller";

// service
import { HorizonUserService } from "./horizon-user.service";

// entities
import { User } from "../user/user.entity";
import { HorizonUser } from "./horizon-user.entity";
import { HorizonRole } from "src/modules/horizonRole/horizon-role.entity";

// automapper
import { HorizonUserAutomapper } from "./horizon-user.automapper";

// base
import { CrudService } from "src/modules/models/service/CrudService";

@Module({
  imports: [
    TypeOrmModule.forFeature([HorizonUser, HorizonRole, User]),
    HorizonRoleModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [HorizonUserController],
  providers: [Repository, Array, CrudService, HorizonUserService, HorizonUserAutomapper],
  exports: [HorizonUserService, HorizonUserAutomapper],
})
export class HorizonUserModule {}
