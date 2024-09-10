import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { AppTranslation } from "./app-translation.entity";

// dto
import { AppTranslationDto } from "./dto/app-translation.dto";
import { AddAppTranslationDto } from "./dto/add-app-translation.dto";
import { UpdateAppTranslationDto } from "./dto/update-app-translation.dto";

@Injectable()
export class AppTranslationService extends CrudService<
  AppTranslation,
  AddAppTranslationDto,
  UpdateAppTranslationDto
> {
  constructor(
    @InjectRepository(AppTranslation) appService: Repository<AppTranslation>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(appService, mapper);
  }

  async getByAppId(appId: number) {
    const translations = await this.entityService.find({
      where: {
        appId,
      },
    });

    return this.mapper.mapArrayAsync(translations, AppTranslation, AppTranslationDto);
  }
}
