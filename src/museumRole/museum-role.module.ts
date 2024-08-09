import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutomapperModule } from "@automapper/nestjs";

// controller
import { MuseumRoleController } from "./museum-role.controller";

// service
import { MuseumRoleService } from "./museum-role.service";

// entities
import { MuseumRole } from "./museum-role.entity";
import { MuseumUser } from "src/museumUser/museum-user.entity";

// automapper
import { MuseumRoleAutomapper } from "./museum-role.automapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([MuseumRole, MuseumUser]),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [MuseumRoleController],
  providers: [MuseumRoleService, MuseumRoleAutomapper],
  exports: [MuseumRoleService, MuseumRoleAutomapper],
})
export class MuseumRoleModule {}
