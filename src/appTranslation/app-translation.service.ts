import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// utils
import { CSVToArray } from "src/utils/csv";

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

  async uploadTranslations(appId: number, content: string) {
    const result = CSVToArray(content, ",");
    const columns = result.splice(0, 1)[0];
    const groupByLang = {};
    const parseRows = result.map((item: any) => {
      const parsedItem = { name: "" };
      columns.forEach((column: string, i) => {
        switch (column) {
          case "Key":
          case "key":
            parsedItem.name = item[i];
            break;
          default:
            const matches = [...column.matchAll(/\([a-zA-Z]{2}\)/g)];
            if (matches.length) {
              const lang = matches.map((match) => match[0])[0];
              const parsedLang = lang.substring(1, lang.length - 1);
              if (!groupByLang[parsedLang]) groupByLang[parsedLang] = {};
              groupByLang[parsedLang][parsedItem.name] = item[i];
            }
        }
      });
      return parsedItem;
    });

    console.log(groupByLang, parseRows);
  }
}
