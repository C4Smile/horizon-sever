import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

// dto
import { AddCannonReqTechDto } from "./dto/add-cannon-req-tech.dto";

// services
import { CannonReqTechService } from "./cannon-req-tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("cannonReqTechs")
export class CannonReqTechController {
  constructor(private cannonCannonReqTechService: CannonReqTechService) {}

  @Get(":id")
  getByTechId(@Param("id", ParseIntPipe) id: number) {
    return this.cannonCannonReqTechService.getByEntityId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Param("id", ParseIntPipe) id: number, @Body() newCannonReqTech: AddCannonReqTechDto) {
    return this.cannonCannonReqTechService.create(id, newCannonReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Param("id", ParseIntPipe) id: number, @Body() ids: number[]) {
    return this.cannonCannonReqTechService.remove(id, ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":entityId/:remoteId")
  removeSingle(
    @Param("entityId", ParseIntPipe) entityId: number,
    @Param("remoteId", ParseIntPipe) remoteId: number,
  ) {
    return this.cannonCannonReqTechService.removeSingle(entityId, remoteId);
  }
}
