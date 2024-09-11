import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

// entity
import { LangTranslation } from "./lang-translation.entity";

// dto
import { AddLangTranslationDto } from "./dto/add-lang-translation.dto";

@Injectable()
export class LangTranslationService {
  constructor(
    @InjectRepository(LangTranslation) private langTranslationService: Repository<LangTranslation>,
  ) {}

  async create(langTranslation: AddLangTranslationDto) {
    const newLangTranslation = this.langTranslationService.create(langTranslation);
    const saved = await this.langTranslationService.save(newLangTranslation);
    return [saved];
  }

  async remove(ids: number[]) {
    const result = await this.langTranslationService.delete(ids);
    if (result.affected === 0)
      throw new HttpException("Room Has Image not Found", HttpStatus.NOT_FOUND);

    return result;
  }
}
