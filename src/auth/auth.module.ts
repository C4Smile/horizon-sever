import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { UserModule } from "src/user/user.module";

// entity
import { User } from "src/user/user.entity";

// controller
import { AuthController } from "./auth.controller";

// service
import { AuthService } from "./auth.service";

// strategy
import { JwtStrategy } from "./jwt.strategy";

// constants
import { jwtConstant } from "./dto/jwtConstant";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({ secret: jwtConstant.secret, signOptions: { expiresIn: "24h" } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
