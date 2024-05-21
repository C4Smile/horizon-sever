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
import { CurrencyDto } from "./dto/currency.dto";
import { AddCurrencyDto } from "./dto/add-currency.dto";

// services
import { CurrencyService } from "./currency.service";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

// guard
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("currency")
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get()
  get(@Query() query): Promise<CurrencyDto[]> {
    const { order = "lastUpdate", page = 0, count = 20 } = query;
    return this.currencyService.get({ order, page, count });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.currencyService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() newCurrency: AddCurrencyDto) {
    return this.currencyService.create(newCurrency);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.currencyService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateCurrencyDto) {
    return this.currencyService.update(id, data);
  }
}
