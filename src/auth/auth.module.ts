import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { UsersModule } from "src/users/users.module";

// entity
import { User } from "src/users/user.entity";

// controller
import { AuthController } from "./auth.controller";

// service
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
