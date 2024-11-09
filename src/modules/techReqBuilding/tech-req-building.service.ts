import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { TechReqBuilding } from "./entities/tech-req-building.entity";

// dto
import { AddTechReqBuildingDto } from "./dto/add-tech-req-building.dto";
import { UpdateTechReqBuildingDto } from "./dto/update-tech-req-building.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class TechReqBuildingService extends CrudManyService<
  TechReqBuilding,
  AddTechReqBuildingDto,
  UpdateTechReqBuildingDto
> {
  constructor(@InjectRepository(TechReqBuilding) techCostsService: Repository<TechReqBuilding>) {
    const relationships = ["tech", "building"];
    super(techCostsService, "techId", "techRedId", relationships);
  }
}
