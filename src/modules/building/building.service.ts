import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { Building } from "./entities/building.entity";
import { Photo } from "../image/image.entity";

// dto
import { AddBuildingDto } from "./dto/add-building.dto";
import { UpdateBuildingDto } from "./dto/update-building.dto";

@Injectable()
export class BuildingService extends CrudService<Building, AddBuildingDto, UpdateBuildingDto> {
  constructor(
    @InjectRepository(Building) buildingService: Repository<Building>,
    @InjectRepository(Photo) imageService: Repository<Photo>,
  ) {
    const relationships = ["image", "type"];
    super(buildingService, imageService, relationships);
  }
}
