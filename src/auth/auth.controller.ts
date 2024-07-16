import { Body, Controller, Post, UseGuards } from "@nestjs/common";

// guard
import { JwtAuthGuard } from "./jwt-auth.guard";

// service
import { AuthService } from "./auth.service";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { AddUserDto } from "src/user/dto/add-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @GET("validate")
  validate() {
    return this.authService.validate();
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post("register")
  async register(@Body() addUserDto: AddUserDto) {
    return this.authService.register(addUserDto);
  }
}
