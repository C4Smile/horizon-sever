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
import { MuseumRoleDto } from "./dto/museum-role.dto";
import { AddMuseumRoleDto } from "./dto/add-museum-role.dto";

// services
import { MuseumRoleService } from "./museum-role.service";
import { UpdateMuseumRoleDto } from "./dto/update-museum-role.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("museumRole")
export class MuseumRoleController {
  constructor(private museumRoleService: MuseumRoleService) {}

  @Get()
  get(@Query() query): Promise<MuseumRoleDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.museumRoleService.get({ sort, order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.museumRoleService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newMuseumRole: AddMuseumRoleDto) {
    return this.museumRoleService.create(newMuseumRole);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.museumRoleService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateMuseumRoleDto) {
    return this.museumRoleService.update(id, data);
  }
}
