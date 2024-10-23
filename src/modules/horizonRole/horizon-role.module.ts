import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { HorizonRoleController } from "./horizon-role.controller";

// service
import { HorizonRoleService } from "./horizon-role.service";

// entities
import { HorizonRole } from "./entities/horizon-role.entity";

// automapper
import { HorizonUser } from "../horizonUser/entities/horizon-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([HorizonRole, HorizonUser])],
  controllers: [HorizonRoleController],
  providers: [HorizonRoleService],
  exports: [HorizonRoleService],
})
export class HorizonRoleModule {}
