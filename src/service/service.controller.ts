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
import { MapInterceptor } from "@automapper/nestjs";

// entity
import { Service } from "./service.entity";

// utils
import { PagedResult, QueryFilter } from "src/models/types";

// dto
import { ServiceDto } from "./dto/service.dto";
import { AddServiceDto } from "./dto/add-service.dto";

// services
import { ServiceService } from "./service.service";
import { UpdateServiceDto } from "./dto/update-service.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("service")
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Get()
  get(@Query() query: QueryFilter): Promise<PagedResult<ServiceDto>> {
    return this.serviceService.mappedGet(query);
  }

  @Get(":id")
  @UseInterceptors(MapInterceptor(Service, ServiceDto, { isArray: true }))
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.serviceService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newService: AddServiceDto) {
    return this.serviceService.create(newService);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() ids: number[]) {
    return this.serviceService.remove(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("restore")
  restore(@Body() ids: number[]) {
    return this.serviceService.restore(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateServiceDto) {
    return this.serviceService.update(id, data);
  }
}
