import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { TechReqBuilding } from "./entities/tech-req-building.entity";

// dto
import { AddTechReqBuildingDto } from "./dto/add-tech-req-building.dto";
import { UpdateTechReqBuildingDto } from "./dto/update-tech-req-building.dto";

@Injectable()
export class TechReqBuildingService extends CrudService<
  TechReqBuilding,
  AddTechReqBuildingDto,
  UpdateTechReqBuildingDto
> {
  constructor(@InjectRepository(TechReqBuilding) TechReqBuildingService: Repository<TechReqBuilding>) {
    super(TechReqBuildingService);
  }
}
