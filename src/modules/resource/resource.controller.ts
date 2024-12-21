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

// services
import { ResourceService } from "./resource.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("resources")
export class ResourceController {
  constructor(private newsResourceService: ResourceService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<ResourceDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsResourceService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsResourceService.getById(id);
  }

  @Get(":id")
  getByPlayerId(@Param("id", ParseIntPipe) id: number) {
    return this.newsResourceService.getByPlayerId(id);
  }
}
