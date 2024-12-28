import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

// guard
import { JwtAuthGuard } from "./jwt-auth.guard";

// service
import { AuthService } from "./auth.service";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { AddUserDto } from "src/modules/user/dto/add-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get("validate")
  validate() {
    return this.authService.validate();
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post("sign-up")
  async register(@Body() addUserDto: AddUserDto) {
    return this.authService.register(addUserDto);
  }
}
