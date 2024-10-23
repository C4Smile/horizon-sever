import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { App } from "./entities/app.entity";

// dto
import { AddAppDto } from "./dto/add-app.dto";
import { UpdateAppDto } from "./dto/update-app.dto";

@Injectable()
export class AppService extends CrudService<App, AddAppDto, UpdateAppDto> {
  constructor(@InjectRepository(App) appService: Repository<App>) {
    super(appService);
  }
}
