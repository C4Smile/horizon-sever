import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/models/service/CrudService";

// entity
import { AppText } from "./app-text.entity";

// dto
import { AddAppTextDto } from "./dto/add-app-text.dto";
import { UpdateAppTextDto } from "./dto/update-app-text.dto";

@Injectable()
export class AppTextService extends CrudService<AppText, AddAppTextDto, UpdateAppTextDto> {
  constructor(
    @InjectRepository(AppText) appTextService: Repository<AppText>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(appTextService, mapper);
  }
}
