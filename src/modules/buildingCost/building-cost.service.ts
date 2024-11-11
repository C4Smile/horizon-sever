import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { BuildingCost } from "./entities/building-cost.entity";

// dto
import { AddBuildingCostDto } from "./dto/add-building-cost.dto";
import { UpdateBuildingCostDto } from "./dto/update-building-cost.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class BuildingCostService extends CrudManyService<
  BuildingCost,
  AddBuildingCostDto,
  UpdateBuildingCostDto
> {
  constructor(@InjectRepository(BuildingCost) buildingCostsService: Repository<BuildingCost>) {
    const relationships = ["building", "resource"];
    super(buildingCostsService, "buildingId", "resourceId", relationships);
  }
}
