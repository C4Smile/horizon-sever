import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { TechReqTech } from "./entities/tech-req-tech.entity";

// dto
import { AddTechReqTechDto } from "./dto/add-tech-req-tech.dto";
import { UpdateTechReqTechDto } from "./dto/update-tech-req-tech.dto";

@Injectable()
export class TechReqTechService extends CrudService<
  TechReqTech,
  AddTechReqTechDto,
  UpdateTechReqTechDto
> {
  constructor(@InjectRepository(TechReqTech) TechReqTechService: Repository<TechReqTech>) {
    super(TechReqTechService);
  }
}
