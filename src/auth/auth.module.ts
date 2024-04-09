import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { UsersModule } from "src/users/users.module";

// entity
import { User } from "src/users/user.entity";

// controller
import { AuthController } from "./auth.controller";

// service
import { AuthService } from "./auth.service";

// constants
import { jwtConstant } from "./dto/jwtConstant";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({ secret: jwtConstant.secret, signOptions: { expiresIn: "24h" } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
