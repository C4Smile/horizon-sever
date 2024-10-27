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
import { TechProducesDto } from "./dto/tech-produces.dto";
import { AddTechProducesDto } from "./dto/add-tech-produces.dto";
import { UpdateTechProducesDto } from "./dto/update-tech-produces.dto";

// services
import { TechProducesService } from "./tech-produces.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techProduce")
export class TechProducesController {
  constructor(private newsTechProducesService: TechProducesService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<TechProducesDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsTechProducesService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechProducesService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newTechProduce: AddTechProducesDto) {
    return this.newsTechProducesService.create(newTechProduce);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechProducesService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsTechProducesService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateTechProducesDto) {
    return this.newsTechProducesService.update(id, data);
  }
}
