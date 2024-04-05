import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { ProvinceDto } from "./dto/province.dto";
import { AddProvinceDto } from "./dto/add-province.dto";

// services
import { ProvinceService } from "./province.service";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@Controller("province")
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Get()
  get(): Promise<ProvinceDto[]> {
    return this.provinceService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.provinceService.getById(id);
  }

  @Post()
  create(@Body() newProvince: AddProvinceDto) {
    return this.provinceService.create(newProvince);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.provinceService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateProvinceDto) {
    return this.update(id, data);
  }
}
