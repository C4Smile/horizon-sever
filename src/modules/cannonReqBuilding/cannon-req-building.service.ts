import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { CannonReqBuilding } from "./entities/cannon-req-building.entity";

// dto
import { AddCannonReqBuildingDto } from "./dto/add-cannon-req-building.dto";
import { UpdateCannonReqBuildingDto } from "./dto/update-cannon-req-building.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class CannonReqBuildingService extends CrudManyService<
  CannonReqBuilding,
  AddCannonReqBuildingDto,
  UpdateCannonReqBuildingDto
> {
  constructor(@InjectRepository(CannonReqBuilding) cannonCostsService: Repository<CannonReqBuilding>) {
    const relationships = ["cannon", "buildingReq"];
    super(cannonCostsService, "cannonId", "buildingReqId", relationships);
  }
}
