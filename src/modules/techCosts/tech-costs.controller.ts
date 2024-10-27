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
import { TechCostsDto } from "./dto/tech-costs.dto";
import { AddTechCostsDto } from "./dto/add-tech-costs.dto";

// services
import { TechCostsService } from "./tech-costs.service";
import { UpdateTechCostsDto } from "./dto/update-tech-costs.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techCosts")
export class TechCostsController {
  constructor(private newsTechCostsService: TechCostsService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<TechCostsDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsTechCostsService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechCostsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newTechCosts: AddTechCostsDto) {
    return this.newsTechCostsService.create(newTechCosts);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechCostsService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsTechCostsService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateTechCostsDto) {
    return this.newsTechCostsService.update(id, data);
  }
}
