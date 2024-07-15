import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { MuseumUserController } from "./museum-user.controller";

// service
import { MuseumUserService } from "./museum-user.service";

// entities
import { MuseumUser } from "./museum-user.entity";
import { MuseumRole } from "src/museumRole/museum-role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MuseumUser, MuseumRole])],
  controllers: [MuseumUserController],
  providers: [MuseumUserService],
  exports: [MuseumUserService],
})
export class MuseumUserModule {}
