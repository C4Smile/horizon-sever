import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { BuildingUpkeep } from "./entities/building-upkeep.entity";

// dto
import { AddBuildingUpkeepDto } from "./dto/add-building-upkeep.dto";
import { UpdateBuildingUpkeepDto } from "./dto/update-building-cost.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class BuildingUpkeepService extends CrudManyService<
  BuildingUpkeep,
  AddBuildingUpkeepDto,
  UpdateBuildingUpkeepDto
> {
  constructor(@InjectRepository(BuildingUpkeep) buildingUpkeepsService: Repository<BuildingUpkeep>) {
    const relationships = ["building", "resource"];
    super(buildingUpkeepsService, "buildingId", "resourceId", relationships);
  }
}
