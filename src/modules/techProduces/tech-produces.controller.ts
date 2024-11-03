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
import { AddTechProducesDto } from "./dto/add-tech-produces.dto";

// services
import { TechProducesService } from "./tech-produces.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techProduces")
export class TechProducesController {
  constructor(private newsTechCostsService: TechProducesService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechCosts: AddTechProducesDto[]) {
    return this.newsTechCostsService.create(id, newTechCosts);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechCostsService.remove(ids);
  }
}
