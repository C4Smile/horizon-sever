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

// dto
import { ProvinceDto } from "./dto/province.dto";
import { AddProvinceDto } from "./dto/add-province.dto";

// services
import { ProvinceService } from "./province.service";
import { UpdateProvinceDto } from "./dto/update-province.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("province")
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Get()
  get(@Query() query): Promise<ProvinceDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.provinceService.get({ order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.provinceService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newProvince: AddProvinceDto) {
    return this.provinceService.create(newProvince);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.provinceService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateProvinceDto) {
    return this.provinceService.update(id, data);
  }
}
