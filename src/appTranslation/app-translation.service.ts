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
import { Lang } from "src/lang/lang.entity";
import { AppTranslation } from "./app-translation.entity";
import { LangTranslation } from "src/langTranslation/lang-translation.entity";

// service
import { LangTranslationService } from "src/langTranslation/lang-translation.service";

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
    @InjectMapper() mapper: Mapper,
    @InjectRepository(Lang) private langService: Repository<Lang>,
    @InjectRepository(AppTranslation) appTranslationService: Repository<AppTranslation>,
    @InjectRepository(LangTranslation) private langTranslationService: Repository<LangTranslation>,
  ) {
    const relationships = ["lang-translations"];
    super(appTranslationService, mapper, relationships);
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

    const parsed = {};

    // saving translations first
    for (const item of parseRows) {
      const found = await this.entityService.findOne({
        where: {
          name: item.name,
        },
      });
      if (!found) {
        const inserted = this.entityService.create({ ...item, appId });
        const resultOfSave = await this.entityService.save(inserted);
        parsed[resultOfSave.name] = { id: resultOfSave.id, insert: true };
      } else parsed[found.name] = { id: found.id, insert: false };
    }

    // getting langs
    const allLangs = await this.langService.find();
    const langs = {};
    allLangs.forEach((lang) => {
      langs[lang.code] = lang.id;
    });

    const langsToSave = Object.keys(groupByLang);
    for (const lang of langsToSave) {
      const translationsByLang = groupByLang[lang];
      const toSave = Object.keys(translationsByLang);
      for (const translation of toSave) {
        const found = await this.langTranslationService.findOne({
          where: {
            langId: langs[lang],
            translationId: parsed[translation].id,
          },
        });

        if (!found) {
          this.langTranslationService.create({
            langId: langs[lang],
            translationId: parsed[translation].id,
            content: translationsByLang[translation],
          });
        } else {
          found.content = translationsByLang[translation];
          this.langTranslationService.save(found);
        }
      }
    }
    return { status: 200 };
  }
}
