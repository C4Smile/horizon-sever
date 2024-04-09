import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// constant
import { jwtConstant } from "./dto/jwtConstant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstant.secret,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      username: payload.username,
    };
  }
}
