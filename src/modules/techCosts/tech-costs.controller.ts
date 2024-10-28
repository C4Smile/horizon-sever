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

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechCostsService.getByTechId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechCosts: AddTechCostsDto[]) {
    return this.newsTechCostsService.create(id, newTechCosts);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechCostsService.remove(ids);
  }
}
