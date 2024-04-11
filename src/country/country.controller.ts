import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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

  @UseGuards(JwtAuthGuard)
  @Get()
  get(): Promise<CountryDto[]> {
    return this.countryService.get();
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
