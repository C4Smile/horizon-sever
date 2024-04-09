import { Body, Controller, Post } from "@nestjs/common";

// service
import { AuthService } from "./auth.service";

// dto
import { LoginUserDto } from "./dto/login-user.dto";
import { AddUserDto } from "src/users/dto/add-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post("register")
  async register(@Body() addUserDto: AddUserDto) {
    return this.authService.register(addUserDto);
  }
}
