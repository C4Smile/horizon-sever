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
  @UseInterceptors(MapInterceptor(Service, ServiceDto, { isArray: true }))
  get(@Query() query) {
    const { sort = "lastUpdate", order = "DESC", page = 0, count = 20 } = query;
    return this.serviceService.get({ sort, order, page, count });
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
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateServiceDto) {
    return this.serviceService.update(id, data);
  }
}
