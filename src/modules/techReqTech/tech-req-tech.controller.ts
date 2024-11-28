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
import { AddTechReqTechDto } from "./dto/add-tech-req-tech.dto";
import { UpdateTechReqTechDto } from "./dto/update-tech-req-tech.dto";

// services
import { TechReqTechService } from "./tech-req-tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("techReqTechs")
export class TechReqTechController {
  constructor(private newsTechReqTechService: TechReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechReqTechService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechReqTech: AddTechReqTechDto) {
    return this.newsTechReqTechService.create(id, newTechReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() newTechReqTech: UpdateTechReqTechDto) {
    return this.newsTechReqTechService.update(id, newTechReqTech);
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
