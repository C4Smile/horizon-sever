import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { HorizonRoleController } from "./horizon-role.controller";

// service
import { HorizonRoleService } from "./horizon-role.service";

// entities
import { HorizonRole } from "./horizon-role.entity";

// automapper
import { HorizonRoleAutomapper } from "./horizon-role.automapper";
import { HorizonUser } from "../horizonUser/horizon-user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([HorizonRole, HorizonUser]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [HorizonRoleController],
  providers: [HorizonRoleService, HorizonRoleAutomapper],
  exports: [HorizonRoleService, HorizonRoleAutomapper],
})
export class HorizonRoleModule {}
