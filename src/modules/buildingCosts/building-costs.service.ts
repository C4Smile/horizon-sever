import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { BuildingCosts } from "./entities/building-costs.entity";

// dto
import { AddBuildingCostsDto } from "./dto/add-building-costs.dto";
import { UpdateBuildingCostsDto } from "./dto/update-building-costs.dto";

@Injectable()
export class BuildingCostsService extends CrudService<
  BuildingCosts,
  AddBuildingCostsDto,
  UpdateBuildingCostsDto
> {
  constructor(@InjectRepository(BuildingCosts) buildingCostsService: Repository<BuildingCosts>) {
    super(buildingCostsService);
  }
}
