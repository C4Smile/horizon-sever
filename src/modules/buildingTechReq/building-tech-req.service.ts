import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { BuildingTechReq } from "./entities/building-tech-req.entity";

// dto
import { AddBuildingTechReqDto } from "./dto/add-building-tech-req.dto";
import { UpdateBuildingTechReqDto } from "./dto/update-building-tech-req.dto";

@Injectable()
export class BuildingTechReqService extends CrudService<
  BuildingTechReq,
  AddBuildingTechReqDto,
  UpdateBuildingTechReqDto
> {
  constructor(@InjectRepository(BuildingTechReq) buildingTechReqService: Repository<BuildingTechReq>) {
    super(buildingTechReqService);
  }
}
