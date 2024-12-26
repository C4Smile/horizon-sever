import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// controller
import { UserController } from "./game.controller";

// service
import { UserService } from "./game.service";

// entity
import { User } from "./user.entity";

@Module({
  controllers: [GameBasicsController],
  providers: [GameBasicsService],
  exports: [GameBasicsService],
})
export class GameBasicsModule {}
