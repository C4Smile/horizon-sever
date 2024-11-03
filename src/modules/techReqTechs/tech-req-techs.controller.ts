import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddTechReqTechsDto } from "./dto/add-tech-req-techs.dto";

// services
import { TechReqTechService } from "./tech-req-techs.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techReqTechs")
export class TechReqTechsController {
  constructor(private newsTechCostService: TechReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechCostService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechReqTechs: AddTechReqTechsDto[]) {
    return this.newsTechCostService.create(id, newTechReqTechs);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechCostService.remove(ids);
  }
}
