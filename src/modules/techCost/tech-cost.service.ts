import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { TechCost } from "./entities/tech-cost.entity";

// dto
import { AddTechCostDto } from "./dto/add-tech-cost.dto";
import { UpdateTechCostDto } from "./dto/update-tech-cost.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class TechCostService extends CrudManyService<TechCost, AddTechCostDto, UpdateTechCostDto> {
  constructor(@InjectRepository(TechCost) techCostsService: Repository<TechCost>) {
    const relationships = ["tech", "resource"];
    super(techCostsService, "techId", "resourceId", relationships);
  }
}
