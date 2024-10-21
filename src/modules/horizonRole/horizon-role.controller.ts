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
import { HorizonRole } from "./horizon-role.entity";
import { PagedResult } from "src/modules/models/types";

// dto
import { HorizonRoleDto } from "./dto/horizon-role.dto";
import { AddHorizonRoleDto } from "./dto/add-horizon-role.dto";

// services
import { HorizonRoleService } from "./horizon-role.service";
import { UpdateHorizonRoleDto } from "./dto/update-horizon-role.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("HorizonRole")
export class HorizonRoleController {
  constructor(private HorizonRoleService: HorizonRoleService) {}

  @Get()
  @UseInterceptors(MapInterceptor(HorizonRole, HorizonRoleDto, { isArray: true }))
  get(@Query() query): Promise<PagedResult<HorizonRoleDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.HorizonRoleService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(HorizonRole, HorizonRoleDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.HorizonRoleService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newHorizonRole: AddHorizonRoleDto) {
    return this.HorizonRoleService.create(newHorizonRole);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.HorizonRoleService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateHorizonRoleDto) {
    return this.HorizonRoleService.update(id, data);
  }
}
