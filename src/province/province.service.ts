import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { Province } from "./province.entity";

// dto
import { AddProvinceDto } from "./dto/add-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@Injectable()
export class ProvinceService {
  constructor(@InjectRepository(Province) private provinceService: Repository<Province>) {}

  async create(province: AddProvinceDto) {
    const provinceFound = await this.provinceService.findOne({
      where: { name: province.name },
    });

    if (provinceFound) {
      return new HttpException("Province already exists", HttpStatus.CONFLICT);
    }

    const newProvince = this.provinceService.create(province);
    return this.provinceService.save(newProvince);
  }

  get() {
    return this.provinceService.find();
  }

  async getById(id: number) {
    const provinceFound = await this.provinceService.findOne({
      where: {
        id,
      },
    });

    if (!provinceFound) {
      return new HttpException("Province not Found", HttpStatus.NOT_FOUND);
    }

    return provinceFound;
  }

  async remove(id: number) {
    const result = await this.provinceService.delete({ id });
    if (result.affected === 0) {
      return;
    }

    return result;
  }

  async update(id: number, data: UpdateProvinceDto) {
    const provinceFound = await this.provinceService.findOne({
      where: {
        id,
      },
    });

    if (!provinceFound) {
      return new HttpException("Province not Found", HttpStatus.NOT_FOUND);
    }

    const updatedProvince = Object.assign(provinceFound, data);

    return this.provinceService.save(updatedProvince);
  }
}
