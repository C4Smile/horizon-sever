import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// service
import { CountryService } from "src/country/country.service";

// entity
import { Province } from "./province.entity";

// dto
import { AddProvinceDto } from "./dto/add-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province) private provinceService: Repository<Province>,
    private countriesService: CountryService,
  ) {}

  async create(province: AddProvinceDto) {
    const countryFound = await this.countriesService.getById(province.countryId);

    if (!countryFound) return new HttpException("Country not Found", HttpStatus.NOT_FOUND);

    const provinceFound = await this.provinceService.findOne({
      where: { name: province.name },
    });

    if (provinceFound) return new HttpException("Province already exists", HttpStatus.CONFLICT);

    const newProvince = this.provinceService.create(province);
    return this.provinceService.save(newProvince);
  }

  get() {
    return this.provinceService.find({
      relations: ["country"],
    });
  }

  async getById(id: number) {
    const provinceFound = await this.provinceService.findOne({
      where: {
        id,
      },
    });

    if (!provinceFound) return new HttpException("Province not Found", HttpStatus.NOT_FOUND);

    return provinceFound;
  }

  async remove(id: number) {
    const result = await this.provinceService.delete({ id });
    if (result.affected === 0) return new HttpException("Province not Found", HttpStatus.NOT_FOUND);

    return result;
  }

  async update(id: number, data: UpdateProvinceDto) {
    const provinceFound = await this.provinceService.findOne({
      where: {
        id,
      },
    });

    if (!provinceFound) return new HttpException("Province not Found", HttpStatus.NOT_FOUND);

    const updatedProvince = Object.assign(provinceFound, data);

    return this.provinceService.save(updatedProvince);
  }
}
