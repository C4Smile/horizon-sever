import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { BuildingReqTech } from "./entities/building-req-tech.entity";

// dto
import { AddBuildingReqTechDto } from "./dto/add-building-req-tech.dto";
import { UpdateBuildingReqTechDto } from "./dto/update-building-req-tech.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class BuildingReqTechService extends CrudManyService<
  BuildingReqTech,
  AddBuildingReqTechDto,
  UpdateBuildingReqTechDto
> {
  constructor(@InjectRepository(BuildingReqTech) buildingReqTechsService: Repository<BuildingReqTech>) {
    const relationships = ["building", "techReq"];
    super(buildingReqTechsService, "buildingId", "techRedId", relationships);
  }
}
