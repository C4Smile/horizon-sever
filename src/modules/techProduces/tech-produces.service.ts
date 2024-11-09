import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { TechProduces } from "./entities/tech-produces.entity";

// dto
import { AddTechProducesDto } from "./dto/add-tech-produces.dto";
import { UpdateTechProducesDto } from "./dto/update-tech-produces.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class TechProducesService extends CrudManyService<
  TechProduces,
  AddTechProducesDto,
  UpdateTechProducesDto
> {
  constructor(@InjectRepository(TechProduces) techCostsService: Repository<TechProduces>) {
    const relationships = ["tech", "resource"];
    super(techCostsService, "techId", "resourceId", relationships);
  }
}
