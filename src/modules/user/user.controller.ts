import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

// dto
import { UserDto } from "./dto/user.dto";
import { AddUserDto } from "./dto/add-user.dto";

// services
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<UserDto[]> {
    return this.userService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newUser: AddUserDto) {
    return this.userService.create(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }
}
