import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// entity
import { ShipCost } from "./entities/ship-cost.entity";

// dto
import { AddShipCostDto } from "./dto/add-ship-cost.dto";
import { UpdateShipCostDto } from "./dto/update-ship-cost.dto";
import { CrudManyService } from "../models/service/CrudManyService";

@Injectable()
export class ShipCostService extends CrudManyService<ShipCost, AddShipCostDto, UpdateShipCostDto> {
  constructor(@InjectRepository(ShipCost) shipCostsService: Repository<ShipCost>) {
    const relationships = ["ship", "resource"];
    super(shipCostsService, "shipId", "resourceId", relationships);
  }
}
