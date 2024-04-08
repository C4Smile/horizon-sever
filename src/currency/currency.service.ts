import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Currency } from "./currency.entity";

// dto
import { AddCurrencyDto } from "./dto/add-currency.dto";
import { UpdateCurrencyDto } from "./dto/update-currency.dto";

@Injectable()
export class CurrencyService {
  constructor(@InjectRepository(Currency) private currencyService: Repository<Currency>) {}

  async create(currency: AddCurrencyDto) {
    const currencyFound = await this.currencyService.findOne({
      where: { name: currency.name },
    });

    if (currencyFound) {
      return new HttpException("Currency already exists", HttpStatus.CONFLICT);
    }

    const newCurrency = this.currencyService.create(currency);
    return this.currencyService.save(newCurrency);
  }

  get() {
    return this.currencyService.find();
  }

  async getById(id: number) {
    const currencyFound = await this.currencyService.findOne({
      where: {
        id,
      },
    });

    if (!currencyFound) {
      return new HttpException("Currency not Found", HttpStatus.NOT_FOUND);
    }

    return currencyFound;
  }

  async remove(id: number) {
    const result = await this.currencyService.delete({ id });
    if (result.affected === 0) {
      return;
    }

    return result;
  }

  async update(id: number, data: UpdateCurrencyDto) {
    const currencyFound = await this.currencyService.findOne({
      where: {
        id,
      },
    });

    if (!currencyFound) {
      return new HttpException("Currency not Found", HttpStatus.NOT_FOUND);
    }

    const updatedCurrency = Object.assign(currencyFound, data);

    return this.currencyService.save(updatedCurrency);
  }
}
