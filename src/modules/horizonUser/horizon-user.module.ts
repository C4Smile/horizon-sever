import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// modules
import { HorizonRoleModule } from "src/modules/horizonRole/horizon-role.module";

// controller
import { HorizonUserController } from "./horizon-user.controller";

// service
import { HorizonUserService } from "./horizon-user.service";

// entities
import { User } from "../user/user.entity";
import { HorizonUser } from "./entities/horizon-user.entity";
import { HorizonRole } from "src/modules/horizonRole/entities/horizon-role.entity";
import { Photo } from "../image/image.entity";

// base
import { CrudService } from "src/modules/models/service/CrudService";

@Module({
  imports: [TypeOrmModule.forFeature([HorizonUser, HorizonRole, User, Photo]), HorizonRoleModule],
  controllers: [HorizonUserController],
  providers: [Repository, Array, CrudService, HorizonUserService],
  exports: [HorizonUserService],
})
export class HorizonUserModule {}
