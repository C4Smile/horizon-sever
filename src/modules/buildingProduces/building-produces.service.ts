import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { BuildingProduces } from "./entities/building-produces.entity";

// dto
import { AddBuildingProducesDto } from "./dto/add-building-produces.dto";
import { UpdateBuildingProducesDto } from "./dto/update-building-produces.dto";

@Injectable()
export class BuildingProducesService extends CrudService<
  BuildingProduces,
  AddBuildingProducesDto,
  UpdateBuildingProducesDto
> {
  constructor(@InjectRepository(BuildingProduces) buildingProduceService: Repository<BuildingProduces>) {
    super(buildingProduceService);
  }
}
