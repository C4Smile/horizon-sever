import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { BuildingCost } from "./entities/building-cost.entity";

// dto
import { AddBuildingCostDto } from "./dto/add-building-cost.dto";
import { UpdateBuildingCostDto } from "./dto/update-building-cost.dto";

@Injectable()
export class BuildingCostService extends CrudService<BuildingCost, AddBuildingCostDto, UpdateBuildingCostDto> {
  constructor(@InjectRepository(BuildingCost) buildingCostService: Repository<BuildingCost>) {
    super(buildingCostService);
  }
}
