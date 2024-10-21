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
import { HorizonUser } from "./horizon-user.entity";

// entities
import { PagedResult, QueryFilter } from "src/modules/models/types";

// dto
import { HorizonUserDto } from "./dto/horizon-user.dto";
import { AddHorizonUserDto } from "./dto/add-horizon-user.dto";

// services
import { HorizonUserService } from "./horizon-user.service";
import { UpdateHorizonUserDto } from "./dto/update-horizon-user.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("horizonUser")
export class HorizonUserController {
  constructor(private horizonUserService: HorizonUserService) {}

  @Get()
  get(@Query() query: QueryFilter): Promise<PagedResult<HorizonUserDto>> {
    return this.horizonUserService.mappedGet(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get("byUserId/:userId")
  async login(@Param("userId", ParseIntPipe) userId: number) {
    return this.horizonUserService.getByUserId(userId);
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(HorizonUser, HorizonUserDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.horizonUserService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newHorizonUser: AddHorizonUserDto) {
    return this.horizonUserService.create(newHorizonUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.horizonUserService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateHorizonUserDto) {
    return this.horizonUserService.update(id, data);
  }
}
