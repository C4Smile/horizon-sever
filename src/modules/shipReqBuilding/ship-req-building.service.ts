import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { ShipReqBuilding } from "./entities/ship-req-building.entity";

// dto
import { AddShipReqBuildingDto } from "./dto/add-ship-req-building.dto";
import { UpdateShipReqBuildingDto } from "./dto/update-ship-req-building.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class ShipReqBuildingService extends CrudManyService<
  ShipReqBuilding,
  AddShipReqBuildingDto,
  UpdateShipReqBuildingDto
> {
  constructor(@InjectRepository(ShipReqBuilding) shipCostsService: Repository<ShipReqBuilding>) {
    const relationships = ["ship", "buildingReq"];
    super(shipCostsService, "shipId", "buildingReqId", relationships);
  }
}
