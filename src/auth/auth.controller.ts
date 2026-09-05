import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

// guard
import { JwtAuthGuard } from "./jwt-auth.guard";

// service
import { AuthService } from "./auth.service";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { AddUserDto } from "src/modules/user/dto/add-user.dto";
import { TokenDto } from "./dto/token.dto";

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

  @Post("register")
  async register(@Body() addUserDto: AddUserDto) {
    return this.authService.register(addUserDto);
  }

  @Post("validate-email")
  async validateEmail(@Body() tokenDto: TokenDto) {
    return this.authService.validateEmail(tokenDto);
  }
}
