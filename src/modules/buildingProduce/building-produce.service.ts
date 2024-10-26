import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { BuildingProduce } from "./entities/building-produce.entity";

// dto
import { AddBuildingProduceDto } from "./dto/add-building-produce.dto";
import { UpdateBuildingProduceDto } from "./dto/update-building-produce.dto";

@Injectable()
export class BuildingProduceService extends CrudService<
  BuildingProduce,
  AddBuildingProduceDto,
  UpdateBuildingProduceDto
> {
  constructor(@InjectRepository(BuildingProduce) buildingProduceService: Repository<BuildingProduce>) {
    super(buildingProduceService);
  }
}
