import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Lang } from "./lang.entity";

// dto
import { AddLangDto } from "./dto/add-lang.dto";
import { UpdateLangDto } from "./dto/update-lang.dto";

@Injectable()
export class LangService extends CrudService<Lang, AddLangDto, UpdateLangDto> {
  constructor(@InjectRepository(Lang) langService: Repository<Lang>) {
    super(langService);
  }
}
