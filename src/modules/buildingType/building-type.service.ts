import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// base
import { CrudService } from "src/modules/models/service/CrudService";

// entity
import { BuildingType } from "./entities/building-type.entity";
import { Photo } from "../image/image.entity";

// dto
import { AddBuildingTypeDto } from "./dto/add-building-type.dto";
import { UpdateBuildingTypeDto } from "./dto/update-building-type.dto";

@Injectable()
export class BuildingTypeService extends CrudService<
  BuildingType,
  AddBuildingTypeDto,
  UpdateBuildingTypeDto
> {
  constructor(
    @InjectRepository(BuildingType) buildingTypeService: Repository<BuildingType>,
    @InjectRepository(Photo) imageService: Repository<Photo>,
  ) {
    const relationships = ["buildings", "image"];
    super(buildingTypeService, imageService, relationships);
  }
}
