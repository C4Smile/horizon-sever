import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";

// dto
import { AddTechProducesDto } from "./dto/add-tech-produces.dto";
import { UpdateTechProducesDto } from "./dto/update-tech-produces.dto";

// services
import { TechProducesService } from "./tech-produces.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techProduces")
export class TechProducesController {
  constructor(private techProducesService: TechProducesService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.techProducesService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechProduce: AddTechProducesDto) {
    return this.techProducesService.create(id, newTechProduce);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateTechProduces: UpdateTechProducesDto) {
    return this.techProducesService.update(id, updateTechProduces);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.techProducesService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.techProducesService.removeSingle(entityId, remoteId);
  }
}
