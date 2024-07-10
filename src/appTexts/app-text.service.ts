import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { AppText } from "./app-text.entity";

// dto
import { AddAppTextDto } from "./dto/add-app-text.dto";
import { UpdateAppTextDto } from "./dto/update-app-text.dto";

@Injectable()
export class AppTextService {
  constructor(@InjectRepository(AppText) private appTextService: Repository<AppText>) {}

  async create(appText: AddAppTextDto) {
    const appTextFound = await this.appTextService.findOne({
      where: { title: appText.title },
    });

    if (appTextFound) throw new HttpException("AppText already exists", HttpStatus.CONFLICT);

    const newAppText = this.appTextService.create(appText);
    return this.appTextService.save(newAppText);
  }

  async get({ order, page, count }) {
    const list = await this.appTextService.find({
      skip: page * count,
      take: (page + 1) * count,
      order: {
        [order]: "ASC",
      },
    });

    return list;
  }

  async getById(id: number) {
    const appTextFound = await this.appTextService.findOne({
      where: {
        id,
      },
    });

    if (!appTextFound) throw new HttpException("AppText not Found", HttpStatus.NOT_FOUND);

    return appTextFound;
  }

  async remove(id: number) {
    const result = await this.appTextService.delete({ id });
    if (result.affected === 0) throw new HttpException("AppText not Found", HttpStatus.NOT_FOUND);
    return result;
  }

  async update(id: number, data: UpdateAppTextDto) {
    const appTextFound = await this.appTextService.findOne({
      where: {
        id,
      },
    });

    if (!appTextFound) throw new HttpException("AppText not Found", HttpStatus.NOT_FOUND);

    const conflict = await this.appTextService.findOne({
      where: {
        title: data.title,
      },
    });

    if (conflict && conflict.id !== id)
      throw new HttpException("AppText already exists", HttpStatus.CONFLICT);

    const updatedAppText = Object.assign(appTextFound, data);

    return this.appTextService.save(updatedAppText);
  }
}
