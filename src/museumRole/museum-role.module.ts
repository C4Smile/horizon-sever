import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { MuseumRoleController } from "./museum-role.controller";

// service
import { MuseumRoleService } from "./museum-role.service";

// entities
import { MuseumRole } from "./museum-role.entity";
import { MuseumUser } from "src/museumUser/museum-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MuseumRole, MuseumUser])],
  controllers: [MuseumRoleController],
  providers: [MuseumRoleService],
  exports: [MuseumRoleService],
})
export class MuseumRoleModule {}
