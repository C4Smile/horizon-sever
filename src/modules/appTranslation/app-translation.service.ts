import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// utils
import { CSVToArray } from "src/utils/csv";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Lang } from "../lang/lang.entity";
import { App } from "src/modules/app/entities/app.entity";
import { AppTranslation } from "./entities/app-translation.entity";
import { LangTranslation } from "../langTranslation/entities/lang-translation.entity";

// dto
import { AddAppTranslationDto } from "./dto/add-app-translation.dto";
import { UpdateAppTranslationDto } from "./dto/update-app-translation.dto";
import { LangTranslationDto } from "../langTranslation/dto/lang-translation.dto";

@Injectable()
export class AppTranslationService extends CrudService<
  AppTranslation,
  AddAppTranslationDto,
  UpdateAppTranslationDto
> {
  constructor(
    @InjectRepository(AppTranslation) appTranslationService: Repository<AppTranslation>,
    @InjectRepository(App) private appService: Repository<App>,
    @InjectRepository(Lang) private langService: Repository<Lang>,
    @InjectRepository(LangTranslation) private langTranslationService: Repository<LangTranslation>,
  ) {
    const relationships = ["lang-translations"];
    super(appTranslationService, null, relationships);
  }

  async getByApp(app: string, lang: string) {
    // validating app
    const application = await this.appService.findOne({
      where: {
        name: app,
      },
    });

    if (application) {
      const langTranslations = await this.langTranslationService.find({
        relations: ["lang", "appTranslation"],
      });

      const toFetch = langTranslations.filter(
        (translation) =>
          translation.appTranslation.appId === application.id && translation.lang.code === lang,
      );
      // formatting to lang => translation => content
      const result = {
        [lang]: {},
      };

      toFetch.forEach((translation) => {
        const key = translation.appTranslation.name;
        result[lang][key] = translation.content;
      });
      return result;
    }

    throw new HttpException("Application not Found", HttpStatus.NOT_FOUND);
  }

  async getByAppId(appId: number) {
    const translations = await this.entityService.find({
      where: {
        appId,
      },
      relations: ["langTranslations"],
    });
    return translations;
  }

  async updateLangTranslation(langTranslation: LangTranslationDto) {
    await this.langTranslationService.save(langTranslation);
    return { status: 201 };
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
            appTranslationId: parsed[translation].id,
          },
        });
        if (!found) {
          const toSave = this.langTranslationService.create({
            langId: langs[lang],
            appTranslationId: parsed[translation].id,
            content: translationsByLang[translation],
          });
          await this.langTranslationService.save({
            ...toSave,
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
