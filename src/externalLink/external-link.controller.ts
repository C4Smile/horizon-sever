import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

// dto
import { ExternalLinkDto } from "./dto/external-link.dto";
import { AddExternalLinkDto } from "./dto/add-external-link.dto";

// services
import { ExternalLinkService } from "./external-link.service";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("externalLink")
export class ExternalLinkController {
  constructor(private newsExternalLinkService: ExternalLinkService) {}

  @Get()
  get(@Query() query): Promise<ExternalLinkDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.newsExternalLinkService.get({ order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.newsExternalLinkService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newExternalLink: AddExternalLinkDto) {
    return this.newsExternalLinkService.create(newExternalLink);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.newsExternalLinkService.remove(id);
  }
}
