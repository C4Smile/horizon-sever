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
import { TechDto } from "./dto/tech.dto";
import { AddTechDto } from "./dto/add-tech.dto";
import { UpdateTechDto } from "./dto/update-tech.dto";

// services
import { TechService } from "./tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techs")
export class TechController {
  constructor(private newsTechService: TechService) {}

  @Patch(":id/lock")
  lock(@Param("id", ParseIntPipe) id: number, @Body() user: LockDto) {
    return this.newsTechService.lock(id, user);
  }

  @Patch(":id/release")
  release(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechService.release(id);
  }

  @Get()
  get(@Query() query): Promise<PagedResult<TechDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsTechService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newTech: AddTechDto) {
    return this.newsTechService.create(newTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsTechService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateTechDto) {
    return this.newsTechService.update(id, data);
  }
}
