import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Building } from "./entities/building.entity";

// dto
import { AddBuildingDto } from "./dto/add-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";

@Injectable()
export class BuildingService extends CrudService<Building, AddBuildingDto, UpdateBuildingDto> {
  constructor(@InjectRepository(Building) appTextService: Repository<Building>) {
    super(appTextService);
  }
}
