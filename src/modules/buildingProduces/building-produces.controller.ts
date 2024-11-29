import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

// dto
import { AddBuildingProducesDto } from "./dto/add-building-produces.dto";
import { UpdateBuildingProducesDto } from "./dto/update-building-produces.dto";

// services
import { BuildingProducesService } from "./building-produces.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("buildingProduces")
export class BuildingProducesController {
  constructor(private buildingProducesService: BuildingProducesService) {}

  @Get(":id")
  getByBuildingId(@Param("id", ParseIntPipe) id: number) {
    return this.buildingProducesService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newBuildingProduce: AddBuildingProducesDto) {
    return this.buildingProducesService.create(id, newBuildingProduce);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBuildingProduces: UpdateBuildingProducesDto,
  ) {
    return this.buildingProducesService.update(id, updateBuildingProduces);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.buildingProducesService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.buildingProducesService.removeSingle(entityId, remoteId);
  }
}
