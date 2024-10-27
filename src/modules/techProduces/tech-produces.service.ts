import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { TechProduces } from "./entities/tech-produces.entity";

// dto
import { AddTechProducesDto } from "./dto/add-tech-produces.dto";
import { UpdateTechProducesDto } from "./dto/update-tech-produces.dto";

@Injectable()
export class TechProducesService extends CrudService<
  TechProduces,
  AddTechProducesDto,
  UpdateTechProducesDto
> {
  constructor(@InjectRepository(TechProduces) techProduceService: Repository<TechProduces>) {
    super(techProduceService);
  }
}
