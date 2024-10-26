import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { BuildingUpkeep } from "./entities/building-upkeep.entity";

// dto
import { AddBuildingUpkeepDto } from "./dto/add-building-upkeep.dto";
import { UpdateBuildingUpkeepDto } from "./dto/update-building-upkeep.dto";

@Injectable()
export class BuildingUpkeepService extends CrudService<
  BuildingUpkeep,
  AddBuildingUpkeepDto,
  UpdateBuildingUpkeepDto
> {
  constructor(@InjectRepository(BuildingUpkeep) buildingUpkeepService: Repository<BuildingUpkeep>) {
    super(buildingUpkeepService);
  }
}
