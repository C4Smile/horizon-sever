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

    if (countryFound) throw new HttpException("Country already exists", HttpStatus.CONFLICT);

    const newCountry = this.countryService.create(country);
    return this.countryService.save(newCountry);
  }

  async get({ order, page, count }) {
    const queryBuilder = this.countryService.createQueryBuilder("countries");
    queryBuilder
      .orderBy(order)
      .where({ deleted: false })
      .skip(page * count)
      .take((page + 1) * count);
    const list = await queryBuilder.getRawAndEntities();
    return list.entities;
  }

  async getById(id: number) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) throw new HttpException("Country not Found", HttpStatus.NOT_FOUND);

    return countryFound;
  }

  async remove(id: number) {
    const result = await this.countryService.delete({ id });
    if (result.affected === 0) throw new HttpException("Country not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateCountryDto) {
    const countryFound = await this.countryService.findOne({
      where: {
        id,
      },
    });

    if (!countryFound) throw new HttpException("Country not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.countryService.findOne({
      where: {
        name: data.name,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("Country already exists", HttpStatus.CONFLICT);

    const updatedCountry = Object.assign(countryFound, data);

    return this.countryService.save(updatedCountry);
  }
}
