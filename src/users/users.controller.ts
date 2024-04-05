import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { UserDto } from "./dto/user.dto";
import { AddUserDto } from "./dto/add-user.dto";

// services
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  get(): Promise<UserDto[]> {
    return this.usersService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @Post()
  create(@Body() newUser: AddUserDto) {
    return this.usersService.create(newUser);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this.update(id, data);
  }
}
