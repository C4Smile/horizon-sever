import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

// module
import { UserModule } from "src/modules/user/user.module";
import { HorizonUserModule } from "src/modules/horizonUser/horizon-user.module";
import { GameBasicsModule } from "src/modules/game/game.module";

// entity
import { User } from "src/modules/user/user.entity";
import { HorizonUser } from "src/modules/horizonUser/entities/horizon-user.entity";
import { Validation } from "./entities/validation.entity";

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
    TypeOrmModule.forFeature([User, HorizonUser, Validation]),
    UserModule,
    HorizonUserModule,
    // a sign up gives the new player their starting stock, read from the catalogue
    GameBasicsModule,
    JwtModule.register({ secret: jwtConstant.secret, signOptions: { expiresIn: "24h" } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
