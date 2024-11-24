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
import { SkillDto } from "./dto/skill.dto";
import { AddSkillDto } from "./dto/add-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";

// services
import { SkillService } from "./skill.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("skills")
export class SkillController {
  constructor(private newsSkillService: SkillService) {}

  @Patch(":id/lock")
  lock(@Param("id", ParseIntPipe) id: number, @Body() user: LockDto) {
    return this.newsSkillService.lock(id, user);
  }

  @Patch(":id/release")
  release(@Param("id", ParseIntPipe) id: number) {
    return this.newsSkillService.release(id);
  }

  @Get()
  get(@Query() query): Promise<PagedResult<SkillDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsSkillService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsSkillService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newSkill: AddSkillDto) {
    return this.newsSkillService.create(newSkill);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsSkillService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsSkillService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateSkillDto) {
    return this.newsSkillService.update(id, data);
  }
}
