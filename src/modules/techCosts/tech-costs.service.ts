import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { TechCosts } from "./entities/tech-costs.entity";

// dto
import { AddTechCostsDto } from "./dto/add-tech-costs.dto";
import { UpdateTechCostsDto } from "./dto/update-tech-costs.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class TechCostsService extends CrudManyService<TechCosts, AddTechCostsDto, UpdateTechCostsDto> {
  constructor(@InjectRepository(TechCosts) techCostsService: Repository<TechCosts>) {
    const relationships = ["tech", "resource"];
    super(techCostsService, "techId", "resourceId", relationships);
  }
}
