import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { BuildingProduces } from "./entities/building-produces.entity";

// dto
import { AddBuildingProducesDto } from "./dto/add-building-produces.dto";
import { UpdateBuildingProducesDto } from "./dto/update-building-produces.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class BuildingProducesService extends CrudManyService<
  BuildingProduces,
  AddBuildingProducesDto,
  UpdateBuildingProducesDto
> {
  constructor(
    @InjectRepository(BuildingProduces) buildingProducesService: Repository<BuildingProduces>,
  ) {
    const relationships = ["building", "resource"];
    super(buildingProducesService, "buildingId", "resourceId", relationships);
  }
}
