import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { TechReqTechs } from "./entities/tech-req-techs.entity";

// dto
import { AddTechReqTechsDto } from "./dto/add-tech-req-techs.dto";
import { UpdateTechReqTechsDto } from "./dto/update-tech-req-techs.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class TechReqTechService extends CrudManyService<
  TechReqTechs,
  AddTechReqTechsDto,
  UpdateTechReqTechsDto
> {
  constructor(@InjectRepository(TechReqTechs) techCostsService: Repository<TechReqTechs>) {
    const relationships = ["tech"];
    super(techCostsService, "techId", relationships);
  }
}
