import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { HttpModule } from "@nestjs/axios";

// module
import { UserModule } from "src/modules/user/user.module";
import { HorizonUserModule } from "src/modules/horizonUser/horizon-user.module";

// entity
import { User } from "src/modules/user/user.entity";
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";

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
    TypeOrmModule.forFeature([User, HorizonUser]),
    HttpModule,
    UserModule,
    HorizonUserModule,
    JwtModule.register({ secret: jwtConstant.secret, signOptions: { expiresIn: "24h" } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
