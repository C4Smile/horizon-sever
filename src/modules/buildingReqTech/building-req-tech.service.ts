import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { BuildingReqTech } from "./entities/building-req-tech.entity";

// dto
import { AddBuildingReqTechDto } from "./dto/add-building-req-tech.dto";
import { UpdateBuildingReqTechDto } from "./dto/update-building-req-tech.dto";

@Injectable()
export class BuildingReqTechService extends CrudService<
  BuildingReqTech,
  AddBuildingReqTechDto,
  UpdateBuildingReqTechDto
> {
  constructor(@InjectRepository(BuildingReqTech) buildingReqTechService: Repository<BuildingReqTech>) {
    super(buildingReqTechService);
  }
}
