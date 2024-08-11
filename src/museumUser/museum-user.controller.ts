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
  UseInterceptors,
} from "@nestjs/common";
import { MapInterceptor } from "@automapper/nestjs";

// entity
import { MuseumUser } from "./museum-user.entity";

// entities
import { PagedResult, QueryFilter } from "src/models/types";

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
  get(@Query() query: QueryFilter): Promise<PagedResult<MuseumUserDto>> {
    return this.museumUserService.mappedGet(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get("byUserId/:userId")
  async login(@Param("userId", ParseIntPipe) userId: number) {
    return this.museumUserService.getByUserId(userId);
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(MuseumUser, MuseumUserDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.museumUserService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newMuseumUser: AddMuseumUserDto) {
    return this.museumUserService.create(newMuseumUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.museumUserService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateMuseumUserDto) {
    return this.museumUserService.update(id, data);
  }
}
