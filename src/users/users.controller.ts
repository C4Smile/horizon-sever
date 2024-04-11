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
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<UserDto[]> {
    return this.usersService.get();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newUser: AddUserDto) {
    return this.usersService.create(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }
}
