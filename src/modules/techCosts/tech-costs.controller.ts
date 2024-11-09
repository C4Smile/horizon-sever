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
import { AddTechCostsDto } from "./dto/add-tech-costs.dto";

// services
import { TechCostsService } from "./tech-costs.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techCosts")
export class TechCostsController {
  constructor(private newsTechCostsService: TechCostsService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechCostsService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechCost: AddTechCostsDto) {
    return this.newsTechCostsService.create(id, newTechCost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsTechCostsService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsTechCostsService.removeSingle(entityId, remoteId);
  }
}
