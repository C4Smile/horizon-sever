import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { CountryDto } from "./dto/country.dto";
import { AddCountryDto } from "./dto/add-country.dto";

// services
import { CountryService } from "./country.service";
import { UpdateCountryDto } from "./dto/update-country.dto";

@Controller("country")
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  get(): Promise<CountryDto[]> {
    return this.countryService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.countryService.getById(id);
  }

  @Post()
  create(@Body() newCountry: AddCountryDto) {
    return this.countryService.create(newCountry);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.countryService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateCountryDto) {
    return this.update(id, data);
  }
}
