import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddTechReqTechsDto } from "./dto/add-tech-req-techs.dto";

// services
import { TechReqTechService } from "./tech-req-techs.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techReqTechs")
export class TechReqTechsController {
  constructor(private newsTechReqTechService: TechReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechReqTechService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechReqTech: AddTechReqTechsDto) {
    return this.newsTechReqTechService.create(id, newTechReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsTechReqTechService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsTechReqTechService.removeSingle(entityId, remoteId);
  }
}
