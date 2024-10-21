import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Mapper } from "@automapper/core";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { App } from "./app.entity";

// dto
import { AddAppDto } from "./dto/add-app.dto";
import { UpdateAppDto } from "./dto/update-app.dto";

@Injectable()
export class AppService extends CrudService<App, AddAppDto, UpdateAppDto> {
  constructor(@InjectRepository(App) appService: Repository<App>, @InjectMapper() mapper: Mapper) {
    super(appService, mapper);
  }
}
