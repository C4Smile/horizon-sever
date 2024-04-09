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
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({ secret: "2174876", signOptions: { expiresIn: "60s" } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
