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

// entity
import { PagedResult } from "src/modules/models/types";

// dto
import { TechReqTechDto } from "./dto/tech-req-tech.dto";
import { AddTechReqTechDto } from "./dto/add-tech-req-tech.dto";
import { UpdateTechReqTechDto } from "./dto/update-tech-req-tech.dto";

// services
import { TechReqTechService } from "./tech-req-tech.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("TechReqTech")
export class TechReqTechController {
  constructor(private newsTechReqTechService: TechReqTechService) {}

  @Get()
  get(@Query() query): Promise<PagedResult<TechReqTechDto>> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsTechReqTechService.get({ sort, order, page, count });
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsTechReqTechService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newTechReqTech: AddTechReqTechDto) {
    return this.newsTechReqTechService.create(newTechReqTech);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsTechReqTechService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsTechReqTechService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateTechReqTechDto) {
    return this.newsTechReqTechService.update(id, data);
  }
}
