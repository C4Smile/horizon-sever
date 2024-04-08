import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Country } from "./country.entity";

// dto
import { AddCountryDto } from "./dto/add-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";

@Injectable()
export class CountryService {
  constructor(@InjectRepository(Country) private countryService: Repository<Country>) {}

  async create(country: AddCountryDto) {
    const countryFound = await this.countryService.findOne({
      where: { name: country.name },
    });

    if (countryFound) {
      return new HttpException("Country already exists", HttpStatus.CONFLICT);
    }

    const newCountry = this.countryService.create(country);
    return this.countryService.save(newCountry);
  }

  get() {
    return this.countryService.find();
  }

  async getById(id: number) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) {
      return new HttpException("Country not Found", HttpStatus.NOT_FOUND);
    }

    return countryFound;
  }

  async remove(id: number) {
    const result = await this.countryService.delete({ id });
    if (result.affected === 0) {
      return;
    }

    return result;
  }

  async update(id: number, data: UpdateCountryDto) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) {
      return new HttpException("Country not Found", HttpStatus.NOT_FOUND);
    }

    const updatedCountry = Object.assign(countryFound, data);

    return this.countryService.save(updatedCountry);
  }
}
