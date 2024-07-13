import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { MuseumRoleController } from "./museum-role.controller";

// service
import { MuseumRoleService } from "./museum-role.service";

// entities
import { MuseumRole } from "./museum-role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MuseumRole])],
  controllers: [MuseumRoleController],
  providers: [MuseumRoleService],
  exports: [MuseumRoleService],
})
export class MuseumRoleModule {}
