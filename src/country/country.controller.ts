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
import { CountryDto } from "./dto/country.dto";
import { AddCountryDto } from "./dto/add-country.dto";

// services
import { CountryService } from "./country.service";
import { UpdateCountryDto } from "./dto/update-country.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("country")
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  get(@Query() query): Promise<CountryDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.countryService.get({ order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.countryService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newCountry: AddCountryDto) {
    return this.countryService.create(newCountry);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.countryService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateCountryDto) {
    return this.countryService.update(id, data);
  }
}
