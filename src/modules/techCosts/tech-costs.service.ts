import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { TechCosts } from "./entities/tech-costs.entity";

// dto
import { AddTechCostsDto } from "./dto/add-tech-costs.dto";
import { UpdateTechCostsDto } from "./dto/update-tech-costs.dto";

@Injectable()
export class TechCostsService extends CrudService<TechCosts, AddTechCostsDto, UpdateTechCostsDto> {
  constructor(@InjectRepository(TechCosts) techCostsService: Repository<TechCosts>) {
    super(techCostsService);
  }
}
