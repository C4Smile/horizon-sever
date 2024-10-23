import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { AppText } from "./entities/app-text.entity";

// dto
import { AddAppTextDto } from "./dto/add-app-text.dto";
import { UpdateAppTextDto } from "./dto/update-app-text.dto";

@Injectable()
export class AppTextService extends CrudService<AppText, AddAppTextDto, UpdateAppTextDto> {
  constructor(@InjectRepository(AppText) appTextService: Repository<AppText>) {
    super(appTextService);
  }
}
