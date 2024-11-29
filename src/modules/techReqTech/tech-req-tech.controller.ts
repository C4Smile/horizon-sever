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
  constructor(private techReqTechService: TechReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.techReqTechService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newTechReqTech: AddTechReqTechDto) {
    return this.techReqTechService.create(id, newTechReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateTechReqTech: UpdateTechReqTechDto) {
    return this.techReqTechService.update(id, updateTechReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.techReqTechService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.techReqTechService.removeSingle(entityId, remoteId);
  }
}
