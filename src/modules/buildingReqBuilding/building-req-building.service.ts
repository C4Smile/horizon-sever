import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { BuildingReqBuilding } from "./entities/building-req-building.entity";

// dto
import { AddBuildingReqBuildingDto } from "./dto/add-building-req-building.dto";
import { UpdateBuildingReqBuildingDto } from "./dto/update-building-req-building.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class BuildingReqBuildingService extends CrudManyService<
  BuildingReqBuilding,
  AddBuildingReqBuildingDto,
  UpdateBuildingReqBuildingDto
> {
  constructor(
    @InjectRepository(BuildingReqBuilding) buildingCostsService: Repository<BuildingReqBuilding>,
  ) {
    const relationships = ["building", "buildingReq"];
    super(buildingCostsService, "buildingId", "buildingReqId", relationships);
  }
}
