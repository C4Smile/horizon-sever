import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

// dto
import { CurrencyDto } from "./dto/currency.dto";
import { AddCurrencyDto } from "./dto/add-currency.dto";

// services
import { CurrencyService } from "./currency.service";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Controller("currency")
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get()
  get(): Promise<CurrencyDto[]> {
    return this.currencyService.get();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.currencyService.getById(id);
  }

  @Post()
  create(@Body() newCurrency: AddCurrencyDto) {
    return this.currencyService.create(newCurrency);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.currencyService.remove(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateCurrencyDto) {
    return this.update(id, data);
  }
}
