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
import { NationDto } from "./dto/nation.dto";
import { AddNationDto } from "./dto/add-nation.dto";
import { UpdateNationDto } from "./dto/update-nation.dto";

// services
import { NationService } from "./nation.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("nations")
export class NationController {
  constructor(private nationService: NationService) {}

  @Patch(":id/lock")
  lock(@Param("id", ParseIntPipe) id: number, @Body() user: LockDto) {
    return this.nationService.lock(id, user);
  }

  @Patch(":id/release")
  release(@Param("id", ParseIntPipe) id: number) {
    return this.nationService.release(id);
  }

  @Get()
  get(@Query() query): Promise<PagedResult<NationDto>> {
    const { sort = "updatedAt", order = "DESC", page = 0, pageSize = 20 } = query;
    return this.nationService.get({ sort, order, page, pageSize });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.nationService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newNation: AddNationDto) {
    return this.nationService.create(newNation);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.nationService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.nationService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateNationDto) {
    return this.nationService.update(id, data);
  }
}
