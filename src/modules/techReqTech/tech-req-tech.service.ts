import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { TechReqTech } from "./entities/tech-req-tech.entity";

// dto
import { AddTechReqTechDto } from "./dto/add-tech-req-tech.dto";
import { UpdateTechReqTechDto } from "./dto/update-tech-req-tech.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class TechReqTechService extends CrudManyService<
  TechReqTech,
  AddTechReqTechDto,
  UpdateTechReqTechDto
> {
  constructor(@InjectRepository(TechReqTech) techReqTechsService: Repository<TechReqTech>) {
    const relationships = ["tech", "techReq"];
    super(techReqTechsService, "techId", "techReqId", relationships);
  }
}
