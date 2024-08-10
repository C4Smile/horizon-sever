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
  UseInterceptors,
} from "@nestjs/common";

// entity
import { ExternalLink } from "./external-link.entity";

// dto
import { ExternalLinkDto } from "./dto/external-link.dto";
import { AddExternalLinkDto } from "./dto/add-external-link.dto";

// services
import { ExternalLinkService } from "./external-link.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { MapInterceptor } from "@automapper/nestjs";

@Controller("externalLink")
export class ExternalLinkController {
  constructor(private newsExternalLinkService: ExternalLinkService) {}

  @Get()
  @UseInterceptors(MapInterceptor(ExternalLink, ExternalLinkDto, { isArray: true }))
  get(@Query() query): Promise<ExternalLinkDto[]> {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.newsExternalLinkService.get({ sort, order, page, count });
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(ExternalLink, ExternalLinkDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsExternalLinkService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newExternalLink: AddExternalLinkDto) {
    return this.newsExternalLinkService.create(newExternalLink);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.newsExternalLinkService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.newsExternalLinkService.restore(ids);
  }
}
