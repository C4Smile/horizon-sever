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
import { ResourceDto } from "./dto/resource.dto";
import { AddResourceDto } from "./dto/add-resource.dto";
import { UpdateResourceDto } from "./dto/update-resource.dto";

// services
import { ResourceService } from "./resource.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("resources")
export class ResourceController {
  constructor(private newsResourceService: ResourceService) {}

  @Patch(":id/lock")
  lock(@Param("id", ParseIntPipe) id: number, @Body() user: LockDto) {
    return this.newsResourceService.lock(id, user);
  }

  @Patch(":id/release")
  release(@Param("id", ParseIntPipe) id: number) {
    return this.newsResourceService.release(id);
  }

  @Get()
  get(@Query() query): Promise<PagedResult<ResourceDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsResourceService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsResourceService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newResource: AddResourceDto) {
    return this.newsResourceService.create(newResource);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsResourceService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsResourceService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateResourceDto) {
    return this.newsResourceService.update(id, data);
  }
}
