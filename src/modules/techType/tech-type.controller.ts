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

// entity
import { PagedResult } from "src/modules/models/types";

// dto
import { LockDto } from "../user/dto/lock.dto";
import { TechTypeDto } from "./dto/tech-type.dto";
import { AddTechTypeDto } from "./dto/add-tech-type.dto";
import { UpdateTechTypeDto } from "./dto/update-tech-type.dto";

// services
import { TechTypeService } from "./tech-type.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techTypes")
export class TechTypeController {
  constructor(private newsTechTypeService: TechTypeService) {}

  @Patch(":id/lock")
  lock(@Param("id", ParseIntPipe) id: number, @Body() user: LockDto) {
    return this.newsTechTypeService.lock(id, user);
  }

  @Patch(":id/release")
  release(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechTypeService.release(id);
  }

  @Get()
  get(@Query() query): Promise<PagedResult<TechTypeDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsTechTypeService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechTypeService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newTechType: AddTechTypeDto) {
    return this.newsTechTypeService.create(newTechType);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechTypeService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsTechTypeService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateTechTypeDto) {
    return this.newsTechTypeService.update(id, data);
  }
}
