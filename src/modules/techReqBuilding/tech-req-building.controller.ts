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
import { AddTechReqBuildingDto } from "./dto/add-tech-req-building.dto";
import { UpdateTechReqBuildingDto } from "./dto/update-tech-req-building.dto";

// services
import { TechReqBuildingService } from "./tech-req-building.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techReqBuildings")
export class TechReqBuildingController {
  constructor(private newsReqBuildingService: TechReqBuildingService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsReqBuildingService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechReqBuilding: AddTechReqBuildingDto) {
    return this.newsReqBuildingService.create(id, newTechReqBuilding);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() newTechReqTech: UpdateTechReqBuildingDto) {
    return this.newsReqBuildingService.update(id, newTechReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.newsReqBuildingService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.newsReqBuildingService.removeSingle(entityId, remoteId);
  }
}
