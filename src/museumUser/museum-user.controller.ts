import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

// dto
import { MuseumUserDto } from "./dto/museum-user.dto";
import { AddMuseumUserDto } from "./dto/add-museum-user.dto";

// services
import { MuseumUserService } from "./museum-user.service";
import { UpdateMuseumUserDto } from "./dto/update-museum-user.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("museumUser")
export class MuseumUserController {
  constructor(private museumUserService: MuseumUserService) {}

  @Get()
  get(@Query() query): Promise<MuseumUserDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.museumUserService.get({ sort, order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get("byUserId/:userId")
  async login(@Param("userId", ParseIntPipe) userId: number) {
    return this.museumUserService.getByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.museumUserService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newMuseumUser: AddMuseumUserDto) {
    return this.museumUserService.create(newMuseumUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.museumUserService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateMuseumUserDto) {
    return this.museumUserService.update(id, data);
  }
}
